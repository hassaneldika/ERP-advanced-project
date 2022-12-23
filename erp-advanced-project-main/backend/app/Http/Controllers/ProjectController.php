<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use JsonException;
use Carbon\Carbon;

class ProjectController extends Controller
{
    /**
     * Get All Projects
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::withCount("teams")
            ->orderBy("status", "ASC")
            ->latest()
            ->get();
        return response()->json([
            "projects" => $projects,
        ]);
    }

    /**
     * Create a new project record
     * @throws JsonException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "required|unique:projects",
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $project = Project::create($inputs);
        if ($request["teams"]) {
            $teams = json_decode(
                $request["teams"],
                false,
                512,
                JSON_THROW_ON_ERROR
            );
            $id_teams = [];
            foreach ($teams as $team) {
                $id_teams[] = $team->value;
            }
            $teams_database = Team::findOrFail($id_teams);
            $project->teams()->attach($teams_database);
        }
        return response()->json([
            "message" => "Project Added Successfully",
        ]);
    }

    /**
     * Get Single Project
     */
    public function show(Project $project): JsonResponse
    {
        $roles = [];
        $assigned_employees = $project
            ->users()
            ->wherePivot("end_date", null)
            ->get();
        foreach ($assigned_employees as $assigned_employee) {
            $assigned_employee->team;
            $roles[] = $assigned_employee
                ->roles()
                ->wherePivot("end_date", null)
                ->wherePivot("project_id", $project->id)
                ->first();
        }
        $fetched_teams = DB::table("users")
            ->select("users.team_id")
            ->join("teams", "users.team_id", "=", "teams.id")
            ->join("project_team", "teams.id", "=", "project_team.team_id")
            ->where("project_team.project_id", $project->id)
            ->whereNotIn(
                "users.id",
                DB::table("assignments")
                    ->select("user_id")
                    ->where("assignments.project_id", $project->id)
                    ->where("assignments.end_date", null)
                    ->pluck("user_id")
            )
            ->distinct()
            ->pluck("users.team_id");
        $related_teams = Team::findOrFail($fetched_teams);
        return response()->json([
            "project" => $project,
            "related_teams" => $related_teams,
            "assigned_employees" => $assigned_employees,
            "roles" => $roles,
        ]);
    }

    /**
     * Get A specific teams according to their project
     * @param Project $project
     * @return JsonResponse
     */
    public function filterByProject(Project $project): JsonResponse
    {
        return response()->json([
            "teams" => Team::whereNotIn(
                "teams.id",
                $project
                    ->teams()
                    ->pluck("teams.id")
                    ->toArray()
            )
                ->whereNotIn("teams.id", [1, 2])
                ->get(),
        ]);
    }

    /**
     * Change Status of the project
     * @param Project $project
     * @return JsonResponse
     */
    public function update_status(Project $project): JsonResponse
    {
        $project->status = !$project->status;
        if ($project->status === true) {
            $project->finished_at = Carbon::now();
            $project->save();
            return response()->json([
                "message" => "Project Deactivated",
            ]);
        }
        $project->finished_at = null;
        $project->save();
        return response()->json([
            "message" => "Project Activated",
        ]);
    }

    /**
     * Assignment for employees in project
     * @throws JsonException
     */
    public function assign_employees(
        Project $project,
        Request $request
    ): JsonResponse {
        $request->validate([
            "assignments" => ["required", "string"],
        ]);
        $count = 0;
        $assignments = json_decode(
            $request["assignments"],
            false,
            512,
            JSON_THROW_ON_ERROR
        );
        $roles = [];
        foreach ($assignments as $assignment) {
            $roles[] = $assignment->role;
        }
        $employees = [];
        foreach ($assignments as $assignment) {
            $employees[] = $assignment->user_id;
        }
        $employees_database = User::findOrFail($employees);
        foreach ($employees_database as $employee) {
            $project
                ->users()
                ->attach($employee->id, ["role_id" => $roles[$count]]);
            $count++;
        }
        return response()->json([
            "message" => "Assignment was successful",
        ]);
    }

    /**
     * Edit a specific project
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        $request->validate([
            "name" => [
                "required",
                Rule::unique("projects")->ignore($project->id),
            ],
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $project->update($inputs);
        if ($request["teams"]) {
            $teams = json_decode(
                $request["teams"],
                false,
                512,
                JSON_THROW_ON_ERROR
            );
            $id_teams = [];
            foreach ($teams as $team) {
                $id_teams[] = $team->value;
            }
            $teams_database = Team::findOrFail($id_teams);
            $project->teams()->attach($teams_database);
        }
        return response()->json([
            "message" => "Project Successfully Updated",
            "slug" => $inputs["slug"],
        ]);
    }

    /**
     * Delete a Project
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {
        if ($project->teams()->exists()) {
            return response()->json(
                [
                    "message" =>
                        "Project has teams, please remove all teams to delete.",
                ],
                403
            );
        }
        $project->delete();
        return response()->json([
            "message" => "Project Deleted Successfully",
        ]);
    }
}

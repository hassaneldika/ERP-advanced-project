<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function change_role(User $user, Request $request): JsonResponse
    {
        $request->validate([
            "project" => "required",
            "role" => "required",
        ]);
        $inputs["project"] = $request["project"];
        $inputs["role"] = $request["role"];
        $find_if_same = $user
            ->projects()
            ->wherePivot("end_date", null)
            ->wherePivot("role_id", $inputs["role"])
            ->wherePivot("project_id", $inputs["project"])
            ->get();
        if ($find_if_same->toArray()) {
            return response()->json(
                [
                    "message" => "User already assigned to this role",
                ],
                400
            );
        }
        $check_if_day_elapsed = $user
            ->projects()
            ->wherePivot("end_date", null)
            ->wherePivot("project_id", $inputs["project"])
            ->first();
        $project_role_assigned_date = new Carbon(
            $check_if_day_elapsed->pivot->created_at
        );
        if ($project_role_assigned_date->diffInDays() < 1) {
            return response()->json(
                [
                    "message" =>
                        "User already assigned today, Please try again tomorrow",
                ],
                400
            );
        }
        $check_if_day_elapsed->pivot->end_date = Carbon::now();
        $check_if_day_elapsed->pivot->save();
        $user->projects()->attach($inputs["project"], [
            "role_id" => $inputs["role"],
        ]);
        return response()->json([
            "message" => "User role changed Successfully",
        ]);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function projects(User $user): JsonResponse
    {
        return response()->json([
            "projects" => $user
                ->projects()
                ->wherePivot("end_date", null)
                ->get(),
            "roles" => $user
                ->roles()
                ->wherePivot("end_date", null)
                ->get(),
        ]);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function reports(User $user): JsonResponse
    {
        $last_skills = [];
        foreach ($user->skills as $skill) {
            $last_skills[] = $skill->kpi
                ->where("skill_user.skill_id", $skill->id)
                ->where("skill_user.user_id", $user->id)
                ->latest()
                ->first();
        }
        $change_to_array = [];
        foreach ($last_skills as $last_skill) {
            $change_to_array[] = $last_skill->toArray();
        }
        $output = array_map(static function ($element) {
            return (object) $element;
        }, $change_to_array);

        return response()->json([
            "user" => $user,
            "skills" => $output,
            "projects" => $user
                ->projects()
                ->orderBy("status", "DESC")
                ->get(),
            "roles" => $user->roles,
        ]);
    }

    /**
     * Get all Employees
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $employees = User::with("team")
            ->orderBy("status", "desc")
            ->latest()
            ->whereNotIn("team_id", [1])
            ->get();
        return response()->json([
            "employees" => $employees,
        ]);
    }

    // save employee to db
    public function store(Request $request): JsonResponse
    {
        $employee = new User();
        $employee->first_name = $request->input("first_name");
        $employee->last_name = $request->input("last_name");
        $employee->email = $request->input("email");
        $employee->phone_number = $request->input("phone_number");

        // 'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move("uploads/", $filename);
            $employee->picture = "uploads/" . $filename;
        }
        $employee->system_role_id = $request->input("system_role_id");
        if ($employee->system_role_id === "2") {
            $employee->team_id = 2;
        }
        $employee->save();
        return response()->json([
            "message" => "Employee Added Successfully",
        ]);
    }

    /**
     * Get specific user according to id
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        $last_skills = [];
        foreach ($user->skills as $skill) {
            $last_skills[] = $skill->kpi
                ->where("skill_user.skill_id", $skill->id)
                ->where("skill_user.user_id", $user->id)
                ->latest()
                ->first();
        }
        $change_to_array = [];
        foreach ($last_skills as $last_skill) {
            $change_to_array[] = $last_skill->toArray();
        }
        $output = array_map(static function ($element) {
            return (object) $element;
        }, $change_to_array);
        return response()->json([
            "team" => $user->team->users->count(),
            "user" => $user,
            "skills" => $output,
        ]);
    }

    // edit employee
    public function edit($id): JsonResponse
    {
        $employee = User::find($id);
        if ($employee) {
            return response()->json([
                "status" => 200,
                "employee" => $employee,
            ]);
        }

        return response()->json([
            "status" => 404,
            "message" => "Employee Does not Exist",
        ]);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password_confirmation" => "required|same:password",
        ]);
        $user->first_name = $request->input("first_name");
        $user->last_name = $request->input("last_name");
        $user->email = $request->input("email");
        $user->phone_number = $request->input("phone_number");

        if ($request->hasFile("image")) {
            $path = $user->picture;
            if (File::exists($path)) {
                File::delete($path);
            }
            $file = $request->file("image");
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move("uploads/", $filename);
            $user->picture = "uploads/" . $filename;
        }

        if ($user->team_id != 1) {
            $user->update();
            return response()->json([
                "message" => "Employee Updated Successfully",
            ]);
        }

        if ($request->input("password")) {
            $user->password = Hash::make($request->input("password"));
        }

        if ($validator->fails()) {
            return response()->json(
                [
                    "message" => $validator,
                ],
                403
            );
        }

        $user->update();
        return response()->json([
            "message" => "Admin Updated Successfully",
        ]);
    }

    public function update_status(User $user): JsonResponse
    {
        if ($user->team_id !== 1) {
            $user->status = !$user->status;
            $user->save();
            if ($user->status === true) {
                return response()->json([
                    "message" => "Employee Activated",
                ]);
            }
            return response()->json([
                "message" => "Employee Deactivated",
            ]);
        }

        if ($user->team_id == 1 && $user->system_role_id == 1) {
            $user->status = !$user->status;
            $user->save();
            if ($user->status === true) {
                return response()->json([
                    "message" => "Admin Activated",
                ]);
            }
            return response()->json([
                "message" => "Admin Deactivated",
            ]);
        }
        return response()->json(
            [
                "message" => "Error Occurred",
            ],
            400
        );
    }

    /**
     * Get all Admins
     *
     */
    public function indexAdmin(): JsonResponse
    {
        $admins = User::orderBy("status", "desc")
            ->latest()
            ->whereIn("system_role_id", [1])

            ->get();
        return response()->json([
            "message" => "Admins are here",
            "admins" => $admins,
        ]);
    }

    public function storeAdmin(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password_confirmation" => "required|same:password",
        ]);
        $admin = new User();
        $admin->first_name = $request->input("first_name");
        $admin->last_name = $request->input("last_name");
        $admin->email = $request->input("email");
        $admin->phone_number = $request->input("phone_number");

        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move("uploads/", $filename);
            $admin->picture = "uploads/" . $filename;
        }
        $admin->system_role_id = $request->input("system_role_id");

        if ($admin->system_role_id === "1") {
            $admin->password = Hash::make($request->input("password"));
            $admin->team_id = 1;
        }

        if ($validator->fails()) {
            return response()->json(
                [
                    "message" => $validator,
                ],
                403
            );
        }
        $admin->save();
        return response()->json([
            "message" => "Admin Updated Successfully",
        ]);
    }

    public function evaluate(User $user, Request $request): JsonResponse
    {
        $request->validate([
            "score" => "required",
            "skill" => "required",
        ]);
        $inputs["score"] = $request["score"];
        $inputs["skill"] = $request["skill"];
        $skill_created_date = "";
        if ($user->skills()->exists()) {
            foreach ($user->skills as $skill) {
                $skill_created_date = $skill->kpi
                    ->where("skill_user.skill_id", $inputs["skill"])
                    ->where("skill_user.user_id", $user->id)
                    ->latest()
                    ->first();
            }
            if ($skill_created_date !== null) {
                $check_month = new Carbon($skill_created_date->created_at);
                if ($check_month->diffInMonths() < 1) {
                    return response()->json(
                        [
                            "message" =>
                                "User has been evaluated for this month.",
                        ],
                        400
                    );
                }
                $user
                    ->skills()
                    ->attach($inputs["skill"], ["score" => $inputs["score"]]);
                return response()->json([
                    "message" => "User was Evaluated",
                ]);
            }

            $user
                ->skills()
                ->attach($inputs["skill"], ["score" => $inputs["score"]]);
            return response()->json([
                "message" => "User was Evaluated",
            ]);
        }
        $user
            ->skills()
            ->attach($inputs["skill"], ["score" => $inputs["score"]]);

        return response()->json([
            "message" => "User was Evaluated",
        ]);
    }
}

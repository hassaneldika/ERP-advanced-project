<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SkillController extends Controller
{
    /**
     * Get All Skills
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $skills = Skill::withCount("users")
            ->latest()
            ->get();
        return response()->json([
            "skills" => $skills,
        ]);
    }

    /**
     * Create a new skill record
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "required|unique:skills",
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        Skill::create($inputs);
        return response()->json([
            "message" => "Skill Added Successfully",
        ]);
    }

    /**
     * Get Single Skill
     */
    public function show(Skill $skill): Skill
    {
        return $skill;
    }

    /**
     * Edit a specific skill
     * @param Request $request
     * @param Skill $skill
     * @return JsonResponse
     */
    public function update(Request $request, Skill $skill): JsonResponse
    {
        $request->validate([
            "name" => ["required", Rule::unique("skills")->ignore($skill->id)],
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $skill->update($inputs);
        return response()->json([
            "message" => "Skill Successfully Updated",
        ]);
    }

    /**
     * Delete a Skill
     * @param Skill $skill
     * @return JsonResponse
     */
    public function destroy(Skill $skill): JsonResponse
    {
        $skill->delete();
        return response()->json([
            "message" => "Skill Deleted Successfully",
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $roles = Role::withCount("users")
            ->latest()
            ->get();
        return response()->json([
            "roles" => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "required|unique:roles",
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        Role::create($inputs);
        return response()->json([
            "message" => "Role Added Successfully",
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Role $role
     * @return JsonResponse
     */
    public function update(Request $request, Role $role): JsonResponse
    {
        $request->validate([
            "name" => ["required", Rule::unique("skills")->ignore($role->id)],
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $role->update($inputs);
        return response()->json([
            "message" => "Role Successfully Updated",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Role $role
     * @return JsonResponse
     */
    public function destroy(Role $role): JsonResponse
    {
        $role->delete();
        return response()->json([
            "message" => "Role Deleted Successfully",
        ]);
    }
}

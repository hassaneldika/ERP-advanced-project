<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        /**
         * Create KPI
         */
        $first_role = "developer";
        $second_role = "graphic design";
        $third_role = "data entry";
        $fourth_role = "project manager";
        $teams_fixed = [
            [
                "name" => $first_role,
                "slug" => Str::slug($first_role, "-"),
            ],
            [
                "name" => $second_role,
                "slug" => Str::slug($second_role, "-"),
            ],
            [
                "name" => $third_role,
                "slug" => Str::slug($third_role, "-"),
            ],
            [
                "name" => $fourth_role,
                "slug" => Str::slug($fourth_role, "-"),
            ],
        ];
        foreach ($teams_fixed as $team_fixed) {
            Role::create($team_fixed);
        }
    }
}

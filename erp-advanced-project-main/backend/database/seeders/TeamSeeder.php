<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $name_admin_team = "admin";
        $name_unassigned_team = "unassigned";
        $teams_fixed = [
            [
                "name" => $name_admin_team,
                "slug" => Str::slug($name_admin_team, "-"),
            ],
            [
                "name" => $name_unassigned_team,
                "slug" => Str::slug($name_unassigned_team, "-"),
            ],
        ];
        foreach ($teams_fixed as $team_fixed) {
            Team::create($team_fixed);
        }

        Team::factory()
            ->count(3)
            ->create();
    }
}

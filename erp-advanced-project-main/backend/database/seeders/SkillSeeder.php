<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SkillSeeder extends Seeder
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
        $first_kpi = "collaboration";
        $second_kpi = "teamwork";
        $third_kpi = "conflict resolution";
        $fourth_kpi = "communication";
        $teams_fixed = [
            [
                "name" => $first_kpi,
                "slug" => Str::slug($first_kpi, "-"),
            ],
            [
                "name" => $second_kpi,
                "slug" => Str::slug($second_kpi, "-"),
            ],
            [
                "name" => $third_kpi,
                "slug" => Str::slug($third_kpi, "-"),
            ],
            [
                "name" => $fourth_kpi,
                "slug" => Str::slug($fourth_kpi, "-"),
            ],
        ];
        foreach ($teams_fixed as $team_fixed) {
            Skill::create($team_fixed);
        }
    }
}

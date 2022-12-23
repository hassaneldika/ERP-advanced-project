<?php

namespace Database\Seeders;

use App\Models\SystemRole;
use Illuminate\Database\Seeder;

class SystemRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $system_roles = [
            ["name" => "admin"],
            ["name" => "employee"],
            ["name" => "super_admin"],
        ];
        foreach ($system_roles as $system_role) {
            SystemRole::create($system_role);
        }
    }
}

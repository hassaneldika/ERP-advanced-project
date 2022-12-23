<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()
            ->unique()
            ->company();
        $slug = Str::slug($name, "-");
        return [
            "name" => $name,
            "slug" => $slug,
            "status" => fake()->numberBetween(1, 0),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Project $project) {
            if ($project->status === 1) {
                $project->update([
                    "finished_at" => fake()->dateTime(),
                ]);
            }
        });
    }
}

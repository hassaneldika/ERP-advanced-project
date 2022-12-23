<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "system_role_id" => fake()->numberBetween(1, 2),
            "team_id" => fake()->numberBetween(2, 5),
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "email" => fake()->safeEmail(),
            "email_verified_at" => now(),
            "phone_number" => fake()->randomNumber(8),
            "status" => fake()->boolean(),
            "picture" => $this->faker->avataaar,
            "remember_token" => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified(): static
    {
        return $this->state(function (array $attributes) {
            return [
                "email_verified_at" => null,
            ];
        });
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            if ($user->system_role->id === 1) {
                $user->update([
                    "team_id" => 1,
                    "password" => Hash::make("1q2w3e4r5t"),
                ]);
            }
        });
    }
}

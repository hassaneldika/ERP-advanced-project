<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create("skill_user", static function (Blueprint $table) {
            $table->foreignId("skill_id")->constrained();
            $table->foreignId("user_id")->constrained();
            $table->integer("score");
            $table->timestamps();
            $table->primary(["skill_id", "user_id", "created_at"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists("skill_user");
    }
};

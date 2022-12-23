<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * App\Models\SkillUser
 *
 * @property int $skill_id
 * @property int $user_id
 * @property int $score
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillUser whereUserId($value)
 * @mixin \Eloquent
 */
class SkillUser extends Pivot
{
    use HasFactory;
}

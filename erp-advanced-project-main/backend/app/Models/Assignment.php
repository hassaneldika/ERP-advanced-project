<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Assignment
 *
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property int $role_id
 * @property string|null $end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Role $role
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereUserId($value)
 * @mixin \Eloquent
 */
class Assignment extends Model
{
    /**
     * Get the role that belongs to this assignment.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}

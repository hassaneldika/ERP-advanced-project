<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SystemRole
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SystemRole whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SystemRole extends Model
{
    /**
     * Get the users for the system role.
     */
    public function users(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(User::class);
    }
}

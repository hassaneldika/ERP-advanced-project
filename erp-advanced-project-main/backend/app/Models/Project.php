<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Project
 *
 * @method static \Database\Factories\ProjectFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property int $status
 * @property string|null $finished_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Team[] $teams
 * @property-read int|null $teams_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereFinishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereUpdatedAt($value)
 */
class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["name", "slug", "status", "finished_at"];

    /**
     * Get the teams that belongs to this project.
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class)->withTimestamps();
    }

    /**
     * Get the assignments that belongs to this project.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "assignments")
            ->withPivot("role_id", "end_date")
            ->withTimestamps();
    }

    /**
     * Get the projects with roles.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, "assignments")
            ->withPivot("user_id", "end_date")
            ->withTimestamps();
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return "slug";
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    const PRODUCTION_STATE = 'completed';
    const DEVELOPMENT_STATE = 'development';

    protected $fillable = [
        'name',
        'description',
        'status',
        'user_id',

    ];

    public function isCompleted()
    {
        return $this->status == Project::PRODUCTION_STATE;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function ticket()
    {
        return $this->hasMany(Ticket::class);
    }
}

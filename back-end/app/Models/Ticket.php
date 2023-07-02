<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    const COMPLETED_STATUS = 'completed';
    const OPEN_STATUS = 'open';

    protected $fillable = [
        'name',
        'desciption',
        'status',
        'project_id',
        'user_id'
    ];

    public function isCompleted()
    {
        return $this->status == Ticket::COMPLETED_STATUS;
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function steps()
    {
        return $this->hasMany(Step::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Steps extends Model
{
    use HasFactory;

    protected $fillable =
    [
        'name',
        'description',
        'image',
        'ticket_id'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}

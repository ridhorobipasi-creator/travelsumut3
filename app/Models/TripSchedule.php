<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripSchedule extends Model
{
    protected $fillable = ['title', 'date', 'location', 'status'];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }
}

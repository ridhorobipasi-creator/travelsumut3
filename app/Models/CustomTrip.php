<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomTrip extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'destination', 'date', 'status', 'notes'];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }
}

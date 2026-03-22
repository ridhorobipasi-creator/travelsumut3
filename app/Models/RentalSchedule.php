<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentalSchedule extends Model
{
    protected $fillable = ['title', 'date', 'vehicle', 'status'];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }
}

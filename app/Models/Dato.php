<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dato extends Model
{
    //
    use HasFactory;

    // Si no vas a usar "fillable", debes proteger los campos para evitar asignación masiva
    protected $fillable = [
        'temperatura_api',
        'temperatura_sensor',
    ];
}

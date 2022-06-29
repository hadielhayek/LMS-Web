<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['id', 'name'];
    protected $with = ['std__class'];
    ////
    public function std__class()
    {
        return $this->belongsToMany(Std_Class::class);
    }
    //
    use HasFactory;
}

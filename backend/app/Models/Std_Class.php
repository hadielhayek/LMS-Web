<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Std_Class extends Model
{
    use HasFactory;
    ////
    protected $fillable = ['id', 'name'];
    protected $with = ['sections']; // to show sections related to a class when get classe (or classes)
    ////
    public function sections()
    {
        return $this->hasMany(Section::class);
    }
    //
    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }
    //
    public function student()
    {
        return $this->hasMany(Student::class);
    }
}

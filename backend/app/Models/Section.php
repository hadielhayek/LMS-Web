<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    ////
    protected $fillable = ['id', 'name', 'std__class_id'];
    ////
    public function std__class()
    {
        return $this->belongsTo(Std_Class::class);
    }
    //
    public function students()
    {
        return $this->hasMany(Student::class);
    }
    //

}

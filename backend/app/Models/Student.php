<?php

namespace App\Models;

use App\Models\Attendance;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    public function section()
    {
        return $this->belongsTo(Section::class);
    }
    //
    public function std__class()
    {
        return $this->belongsTo(Std_Class::class);
    }
    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
    //
    use HasFactory;
    //
    protected $table = 'students';
    protected $with = ['attendance'];
    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'std__class_id',
        'section_id',
        'image'
    ];
}

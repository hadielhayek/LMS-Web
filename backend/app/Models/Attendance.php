<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $table = 'attendances';
    protected $fillable = [
        'id',
        'student_id',
        'date',
        'status_id',
    ];
    protected $with = ['status'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}

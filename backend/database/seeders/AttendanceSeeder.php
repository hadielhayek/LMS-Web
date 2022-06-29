<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\Student;
use App\Models\Attendance;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Attendance::factory()->count(10)->create();
        $students = Student::pluck('id')->toArray();
        foreach ($students as $student_id) {
            for ($i = 4; $i <= 8; $i++) {
                Attendance::create([
                    'student_id' => $student_id,
                    'date' => '2022-03-1' . $i,
                    'status_id' =>  Status::all()->random()->id,
                ]);
            }
        }
        foreach ($students as $student_id) {
            for ($i = 1; $i <= 5; $i++) {
                Attendance::create([
                    'student_id' => $student_id,
                    'date' => '2022-03-2' . $i,
                    'status_id' =>  Status::all()->random()->id,
                ]);
            }
        }
    }
}

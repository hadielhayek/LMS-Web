<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $student_id = Student::all()->random()->id;
        $status_id = Status::all()->random()->id;
        return [
            'student_id' => $student_id,
            'date' => $this->faker->date(),
            'status_id' =>  $status_id,
        ];
    }
}

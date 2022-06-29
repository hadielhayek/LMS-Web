<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Course::create([
            'name' => 'course 1',
        ]);

        Course::create([
            'name' => 'course 2',
        ]);
        Course::create([
            'name' => 'course 3',
        ]);
        Course::create([
            'name' => 'course 4',
        ]);
        Course::create([
            'name' => 'course 5',
        ]);
    }
}

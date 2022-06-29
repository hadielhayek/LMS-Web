<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Std_Class;
use Illuminate\Database\Seeder;
use Database\Seeders\Std_ClassSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([CourseSeeder::class]);
        $this->call([Std_ClassSeeder::class]);
        $this->call([SectionSeeder::class]);
        $this->call([StudentSeeder::class]);
        $this->call([StatusSeeder::class]);
        $this->call([AttendanceSeeder::class]);
        $this->call([AdminSeeder::class]);
        $classes = Std_Class::all();
        $courses = Course::all();
        $classes->each(function (Std_Class $s) use ($courses) {
            $s->courses()->attach(
                $courses->random(rand(1, 5))->pluck('id')->toArray()
            );
        });
    }
}

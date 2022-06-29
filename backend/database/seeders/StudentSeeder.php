<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Std_Class;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;
use PhpParser\Builder\Class_;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $this->faker = Faker::create();
        // Student::factory()->count(8)->create();
        $classes = Std_Class::pluck('id')->toArray();
        $sections = Section::pluck('id')->toArray();
        foreach ($classes as $class_id) {
            $sections = Std_Class::find($class_id)->sections;
            foreach ($sections as $section) {
                for ($y = 1; $y <= 5; $y++) {
                    $firstname = $this->faker->firstName();
                    $phone = '+96176' . $this->faker->randomNumber(6);
                    Student::create([
                        'first_name' => $firstname,
                        'last_name' => $this->faker->lastName(),
                        'email' => $firstname . '@gmail.com',
                        'phone' =>  $phone,
                        'std__class_id' =>  $class_id,
                        'section_id' => $section->id,
                        'image' => 'https://www.linguisticsociety.org/sites/default/files/beristain_ander-headshot.jpg'
                    ]);
                }
            }
        }
    }
}

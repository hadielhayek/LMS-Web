<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\Std_Class;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $section = Section::all()->random();
        $section_id = $section->id;
        $class_id = $section->std__class_id;
        $firstname = $this->faker->firstName();
        $phone = '+96176' . $this->faker->randomNumber(6);
        return [
            'first_name' => $firstname,
            'last_name' => $this->faker->lastName(),
            'email' => $firstname . '@gmail.com',
            'phone' =>  $phone,
            'std__class_id' =>  $class_id,
            'section_id' => $section_id,
            'image' => 'https://www.linguisticsociety.org/sites/default/files/beristain_ander-headshot.jpg'
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $firstname = $this->faker->firstName();
        $lastname = $this->faker->lastName();
        $fullname = $firstname . ' ' . $lastname;
        $phone = '+96176' . $this->faker->randomNumber(6);
        return [
            'full_name' => $fullname,
            'email' => $firstname . '@gmail.com',
            'password' => $this->faker->randomNumber(4),
            'phone' =>  $phone,
            'image' => 'https://i2-prod.birminghammail.co.uk/incoming/article11256820.ece/ALTERNATES/s1200c/JS88492176.jpg'
        ];
    }
}

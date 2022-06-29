<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Std_Class;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $classes = Std_Class::pluck('id')->toArray();
        foreach ($classes as $class_id) {
            for ($y = 1; $y <= 3; $y++) {

                Section::create([
                    'name' => 'c' . $class_id . 's' . $y,
                    'std__class_id' => $class_id
                ]);
            }
        }
    }
}

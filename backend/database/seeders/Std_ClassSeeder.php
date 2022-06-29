<?php

namespace Database\Seeders;

use App\Models\Std_Class;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Std_ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Std_Class::create([
            'name' => 'c1',
        ]);

        Std_Class::create([
            'name' => 'c2',
        ]);
        Std_Class::create([
            'name' => 'c3',
        ]);
        Std_Class::create([
            'name' => 'c4',
        ]);
        Std_Class::create([
            'name' => 'c5',
        ]);
        Std_Class::create([
            'name' => 'c6',
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a student record for the admin user
        $userStudent = Student::create([
            'id'    => 'TUPM-00-0001',
            'name'  => 'Sample User',
            'email' => 'sample@tup.edu.ph',
            'course'=> 'BSCS',
            'college'=> 'COS'
        ]);

        // Create a user record for the admin user using the retrieved id
        User::create([
            'tup_id'    => $userStudent->id, 
            'email'     => $userStudent->email,
            'password'  => bcrypt('password'), 
            'role'      => 'user',
            'email_verified_at' => now(),

        ]);
    }
}

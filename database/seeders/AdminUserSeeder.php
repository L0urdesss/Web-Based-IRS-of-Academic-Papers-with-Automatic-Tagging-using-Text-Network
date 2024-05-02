<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create a student record for the admin user
        $adminStudent = Student::create([
            'id'    => 'TUPM-00-0000',
            'name'  => 'Admin User',
            'email' => 'admin@tup.edu.ph',
        ]);

        // Create a user record for the admin user using the retrieved id
        User::create([
            'tup_id'    => $adminStudent->id, 
            'email'     => $adminStudent->email,
            'password'  => bcrypt('password'), 
            'role'      => 'admin',
        ]);
    }
}

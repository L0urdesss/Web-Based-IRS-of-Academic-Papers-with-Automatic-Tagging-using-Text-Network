<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Paper;
use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed students
        Student::factory(50)->create();
    
        // Seed users
        $this->call(UsersTableSeeder::class);
    
        // Seed papers with related request papers
        Paper::factory()
            ->count(30)
            ->hasRequestPapers(3)
            ->create();
    
        // Seed admin users
        $this->call(AdminUserSeeder::class);
    }
    
}

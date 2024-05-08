<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Student;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */

class UserFactory extends Factory

{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;
    protected static array $usedStudentIds = [];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    
     public function definition(): array
     {
         // Fetch all student IDs
         $studentIds = Student::pluck('id')->toArray();
     
         // Log the fetched student IDs
         Log::info('Fetched student IDs: ' . implode(', ', $studentIds));
     
         // Shuffle the array of student IDs
         shuffle($studentIds);
     
         // Select a unique student ID
         $uniqueStudentId = null;
         foreach ($studentIds as $id) {
             if (!in_array($id, static::$usedStudentIds)) {
                 $uniqueStudentId = $id;
                 break;
             }
         }
     
         // Log the unique student ID and used student IDs
         Log::info('Unique student ID: ' . $uniqueStudentId);
         Log::info('Used student IDs: ' . implode(', ', static::$usedStudentIds));
     
         // If no unique student ID found, throw an exception
         if ($uniqueStudentId === null) {
             throw new \Exception("No unique student ID found.");
         }
     
         // Add the used student ID to the list
         static::$usedStudentIds[] = $uniqueStudentId;
     
         // Fetch student details
         $student = Student::find($uniqueStudentId);
     
         // If student not found, handle the case
         if ($student === null) {
             throw new \Exception("Student with ID {$uniqueStudentId} not found.");
         }
     
         return [
             'tup_id'            => $uniqueStudentId,
             'email'             => $student->email,
             'email_verified_at' => now(),
             'password'          => static::$password ??= Hash::make('password'),
             'remember_token'    => Str::random(10),
         ];
     }
}     
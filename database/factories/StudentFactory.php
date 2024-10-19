<?php
namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Generate a unique username
        $username = $this->faker->userName();
        
        // Generate a unique email using the username
        $email = $username . '@tup.edu.ph';

        return [
            'name' => $this->faker->name(),
            'email' => $email,
            'course' => $this->faker->randomElement(['BASLT', 'BSCS', 'BSES', 'BSIS', 'BSIT']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

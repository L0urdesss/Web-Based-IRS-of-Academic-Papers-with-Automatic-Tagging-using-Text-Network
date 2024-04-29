<?php

namespace Database\Factories;

use App\Models\RequestPaper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paper>
 */
class PaperFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */



    public function definition(): array
    {
        $autarray = [];

        for ($i = 1; $i <= rand(1, 4); $i++) {
            $autarray[] = $this->faker->name();
        }

        $autarray = array_unique($autarray);
        $authorsString = implode(', ', $autarray);

        $abstractSentencesCount = rand(4, 10);
        $abstractSentences = [];

        for ($i = 0; $i < $abstractSentencesCount; $i++) {
            $abstractSentences[] = $this->faker->realText();
        }

        $abstract = implode(' ', $abstractSentences);

        return [
            'id' => rand(111, 999),
            'user_id' => rand(1, 10),
            'title' => $this->faker->sentence,
            'author' => $authorsString,
            'abstract' => $abstract,
            'course'=> fake()->randomElement(['BASLT','BSCS','BSES','BSIS','BSIT']),
            'file' => null,
            'date_published' => $this->faker->dateTimeBetween('-9 years', 'now')->format('Y'),
        ];
    }
}

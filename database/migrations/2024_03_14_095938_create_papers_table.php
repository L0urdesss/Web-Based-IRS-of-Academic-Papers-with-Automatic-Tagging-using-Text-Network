<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('papers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->json('author');
            $table->text('abstract');
            $table->string('course');
            $table->string('file')->nullable();
            $table->string('date_published');
            $table->text('main_topic')->nullable();
            $table->text('subtopic')->nullable();
            $table->json('key_terms')->nullable();
            $table->timestamps();
        });
    }

    //php artisan migrate --fresh --seed
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('papers');
    }
};

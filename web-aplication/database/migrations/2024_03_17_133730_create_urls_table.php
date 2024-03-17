<?php

use App\Models\Url;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(Url::TABLE, function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("collection_id");
            $table->foreign("collection_id")->references("id")->on(\App\Models\Collection::TABLE)->cascadeOnDelete();
            $table->longText("url");
            $table->string("name")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(Url::TABLE);
    }
};
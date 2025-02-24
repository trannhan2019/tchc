<?php

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
        Schema::create('phong_bans', function (Blueprint $table) {
            $table->id();
            $table->string('ten_phong_ban');
            $table->string('ma_phong_ban');
            //thu_tu_sap_xep
            $table->integer('thu_tu_sap_xep')->default(0);
            //trang_thai
            $table->tinyInteger('trang_thai')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phong_bans');
    }
};

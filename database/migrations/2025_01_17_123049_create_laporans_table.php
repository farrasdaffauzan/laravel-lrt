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
        Schema::create('laporans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_program');
            $table->integer('jumlah_penerima');
            $table->string('provinsi');
            $table->string('kabupaten');
            $table->string('kecamatan');
            $table->date('tanggal_penyaluran');
            $table->string('bukti_penyaluran');
            $table->text('catatan')->nullable();
            $table->enum('status', allowed: ['Pending', 'Disetujui', 'Ditolak'])->default('Pending');
            $table->text('alasan_penolakan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};

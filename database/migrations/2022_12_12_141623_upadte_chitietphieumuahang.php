<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpadteChitietphieumuahang extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chitietphieubanhang', function (Blueprint $table) {
            $table->unsignedBigInteger('sanphamId');
            $table->unsignedBigInteger('DonVi')->change();
            $table->foreign('sanphamId')->references('id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('DonVi')->references('id')->on('donvitinh')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

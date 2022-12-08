<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Vnshopdb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donvitinh', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('TenDonVi');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('sanpham', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('TenSanPham');
            $table->text('MaSanPham');
            $table->date('NgaySanXuat');
            $table->date('NgayHetHan');
            $table->decimal('GiaNhap', 10, 4)->default(1000);
            $table->boolean('TrangThai')->default(true);
            $table->decimal('SoLuongTonKho')->default(1000);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('sanphamdonvi', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sanphamId');
            $table->unsignedBigInteger('donvitinhId');
            $table->decimal('GiaLe', 10, 4)->default(0);
            $table->decimal('GiaSi', 10, 4)->default(0);
            $table->boolean('Primary');
            $table->timestamps();
            $table->foreign('sanphamId')->references('id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('donvitinhId')->references('id')->on('donvitinh')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('cuahang', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('TenCuaHang');
            $table->text('DiaChi');
            $table->text('SoDienThoai');
            $table->timestamps();
        });

        Schema::create('khachhang', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('HoTen');
            $table->text('DiaChi');
            $table->text('SoDienThoai')->nullable();
            $table->timestamps();
        });

        Schema::create('phieubanhang', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('MaPhieu');
            $table->date('NgayLap');
            $table->tinyInteger('LoaiPhieu');
            $table->decimal('TongTien', 10, 4);
            $table->decimal('TongNo', 10, 4)->default(0);
            $table->boolean('No');
            $table->unsignedBigInteger('khachhangId');
            $table->timestamps();
            $table->foreign('khachhangId')->references('id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('chitietphieubanhang', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('phieubanhangId');
            $table->text('TenSanPham');
            $table->text('DonVi');
            $table->text('SoLuong');
            $table->text('Gia');
            $table->text('ThanhTien');
            $table->timestamps();
            $table->foreign('phieubanhangId')->references('id')->on('phieubanhang')->onDelete('cascade')->onUpdate('cascade');
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

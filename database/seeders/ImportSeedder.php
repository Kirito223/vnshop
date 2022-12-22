<?php

namespace Database\Seeders;

use App\Models\Donvitinh;
use App\Models\Sanpham;
use App\Models\Sanphamdonvi;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImportSeedder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $units = json_decode(file_get_contents(storage_path('app/json/donvitinh.json')));
        $sanpham = json_decode(file_get_contents(storage_path('app/json/sanpham.json')));
        $dvtsp = json_decode(file_get_contents(storage_path('app/json/dvtsp.json')));
        DB::statement("SET foreign_key_checks=0");
        Donvitinh::truncate();
        Sanpham::truncate();
        Sanphamdonvi::truncate();
        DB::statement("SET foreign_key_checks=1");
        foreach ($units as $unitItem) {
            $unit = new Donvitinh();
            $unit->id  = $unitItem->id;
            $unit->TenDonVi = $unitItem->TenDonVi;
            $unit->save();
        }

        foreach ($sanpham as $itemProduct) {
            $sanpham = new Sanpham();
            $sanpham->id = $itemProduct->id;
            $sanpham->TenSanPham = $itemProduct->TenSanPham;
            $sanpham->MaSanPham = $itemProduct->MaSanPham;
            if ($itemProduct->GiaNhap > 2000000) {
                $sanpham->GiaNhap = 1000000;
            } else {
                $sanpham->GiaNhap = $itemProduct->GiaNhap;
            }

            $sanpham->TrangThai = true;
            $sanpham->SoLuongTonKho = 10000;
            $sanpham->NgayHetHan = Carbon::now();
            $sanpham->NgaySanXuat = Carbon::now();
            $sanpham->save();
        }

        foreach ($dvtsp as $dvt) {
            $item = new Sanphamdonvi();
            $item->donvitinhId = $dvt->donvitinhId;
            $item->sanphamId = $dvt->sanphamId;

            $item->GiaSi = $dvt->GiaSi > 3000000 ? 3000000 : $dvt->GiaSi;
            $item->GiaLe = $dvt->GiaLe > 3000000 ? 3000000 : $dvt->GiaLe;
            $item->Primary = $dvt->Primary;
            $item->save();
        }
    }
}

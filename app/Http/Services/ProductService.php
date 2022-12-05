<?php

namespace App\Http\Services;

use App\Models\Sanpham;
use App\Models\Sanphamdonvi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductService extends BaseService
{
    public function List()
    {
        return Sanpham::with(['sanphamdonvis' => function ($query) {
            $query->Where("Primary", true)->with('donvitinh');
        }])->get();
    }

    public function ProductInfo($id)
    {
        return Sanpham::where('id', $id)->with('sanphamdonvis')->first();
    }

    public function Save(Request $request)
    {
        try {

            $check = Sanpham::where("MaSanPham", $request->MaSanPham)->first();
            if ($check == null) {
                DB::beginTransaction();
                $product = new Sanpham($request->all());
                $product->save();
                $units = json_decode($request->units);
                foreach ($units as $unit) {
                    $unitItem = new Sanphamdonvi();
                    $unitItem->donvitinhId = $unit->unit;
                    $unitItem->sanphamId = $product->id;
                    $unitItem->GiaLe = $unit->retail;
                    $unitItem->GiaSi = $unit->whole;
                    $unitItem->Primary = $unit->primary;
                    $unitItem->save();
                }
                DB::commit();
                return $this->Result("Đã lưu sản phẩm");
            } else {
                return $this->Result("Sản phẩm đã tồn tại trong hệ thống, không thể thêm các sản phẩm trùng nhau");
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->Result($th->getMessage());
        }
    }

    public function Update(Request $request)
    {
        try {
            DB::beginTransaction();
            $product = Sanpham::find($request->id);
            $product->update($request->all());
            $units = json_decode($request->units);
            Sanphamdonvi::where("sanphamId", $request->id)->delete();
            foreach ($units as $unit) {
                $unitItem = new Sanphamdonvi();
                $unitItem->donvitinhId = $unit->unit;
                $unitItem->sanphamId = $product->id;
                $unitItem->GiaLe = $unit->retail;
                $unitItem->GiaSi = $unit->whole;
                $unitItem->Primary = $unit->primary;
                $unitItem->save();
            }
            DB::commit();
            return $this->Result("Đã lưu sản phẩm");
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->Result($th->getMessage());
        }
    }

    public function Delete($id)
    {
        Sanpham::destroy($id);
        return $this->Result("Đã xóa sản phẩm");
    }
}

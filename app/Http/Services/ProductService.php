<?php

namespace App\Http\Services;

use App\Models\Chitietphieubanhang;
use App\Models\Phieubanhang;
use App\Models\Sanpham;
use App\Models\Sanphamdonvi;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class ProductService extends BaseService
{
    public function List()
    {
        return Sanpham::with(['sanphamdonvis' => function ($query) {
            $query->with('donvitinh');
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
                $product = Sanpham::where("id", $product->id)->with('sanphamdonvis')->first();
                return $this->Result("Đã lưu sản phẩm", true, $product);
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

    public function Report()
    {
        $startMonth = Carbon::now()->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();
        $dateRanger = CarbonPeriod::create($startMonth, $endMonth);
        $result = array();
        $arrDay = array();
        foreach ($dateRanger as $day) {
            $invoice = Phieubanhang::where("NgayLap", $day)->get();
            $total = 0;
            foreach ($invoice as $invoiceDetail) {
                $total += $invoiceDetail->TongTien;
            }
            array_push($result, $total);
            array_push($arrDay, $day->format('d/m/Y'));
        }
        return ['data' => $result, 'days' => $arrDay];
    }

    public function changePrice(Request $request)
    {
        try {
            $sanpham = Sanphamdonvi::where("sanphamId", $request->productId)
                ->where("donvitinhId", $request->unitId)->first();
            if ($request->type == 1) {
                $sanpham->GiaLe = $request->price;
            } else if ($request->type == 2) {
                $sanpham->GiaSi = $request->price;
            }
            $sanpham->save();
            return $this->Result("Đã lưu giá sản phẩm");
        } catch (\Throwable $th) {
            return $this->Result("Đã xảy ra lỗi", false);
        }
    }
}

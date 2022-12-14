<?php

namespace App\Http\Services;

use App\Models\Chitietphieubanhang;
use App\Models\Phieubanhang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceService extends BaseService
{

    public function SaveInvoice(Request $request)
    {
        try {
            DB::beginTransaction();
            $invoice = new Phieubanhang($request->all());
            if ($request->No < 0) {
                $invoice->No = 1;
            } else {
                $invoice->No = 0;
            }
            $invoice->save();
            $details = json_decode($request->details);
            foreach ($details as $itemDetaIl) {
                $detail = new Chitietphieubanhang();
                $detail->phieubanhangId = $invoice->id;
                $detail->TenSanPham = $itemDetaIl->name;
                $detail->DonVi = $itemDetaIl->unit;
                $detail->SoLuong = $itemDetaIl->quanity;
                $detail->Gia = $itemDetaIl->price;
                $detail->ThanhTien = $itemDetaIl->total;
                $detail->sanphamId = $itemDetaIl->id;
                $detail->save();
            }
            DB::commit();
            return $this->Result("Đã thanh toán thành công");
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function UpdateInvoice(Request $request)
    {
        try {
            DB::beginTransaction();
            $invoice = Phieubanhang::find($request->id);
            if ($request->No < 0) {
                $invoice->No = 1;
            } else {
                $invoice->No = 0;
            }
            $invoice->save();
            $old = Chitietphieubanhang::where("phieubanhangId", $invoice->id)->get();
            foreach ($old as $value) {
                Chitietphieubanhang::destroy($value->id);
            }
            $details = json_decode($request->details);
            foreach ($details as $itemDetaIl) {
                $detail = new Chitietphieubanhang();
                $detail->phieubanhangId = $invoice->id;
                $detail->TenSanPham = $itemDetaIl->name;
                $detail->DonVi = $itemDetaIl->unit;
                $detail->SoLuong = $itemDetaIl->quanity;
                $detail->Gia = $itemDetaIl->price;
                $detail->ThanhTien = $itemDetaIl->total;
                $detail->sanphamId = $itemDetaIl->id;
                $detail->save();
            }
            DB::commit();
            return $this->Result("Đã lưu thông tin hóa đơn thành công");
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function List()
    {
        return Phieubanhang::with(["chitietphieubanhangs" => function ($query) {
            $query->with(["sanpham" => function ($query) {
                $query->with(['sanphamdonvis' => function ($query) {
                    $query->with('donvitinh');
                }]);
            }]);
        }])
            ->with("khachhang")
            ->get();
    }

    public function Delete($id)
    {
        Phieubanhang::destroy($id);
    }
}

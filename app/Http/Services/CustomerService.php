<?php

namespace App\Http\Services;

use App\Models\Chitietphieubanhang;
use App\Models\Khachhang;
use App\Models\Phieubanhang;
use Illuminate\Http\Request;

class CustomerService extends BaseService
{
    public function List()
    {
        return Khachhang::all();
    }

    public function Save(Request $request)
    {
        Khachhang::create($request->all());
        return $this->Result("Đã lưu thông tin khách hàng");
    }
    public function Update(Request $request)
    {
        $customer = Khachhang::find($request->id);
        $customer->update($request->all());
        return $this->Result("Đã cập nhật thông tin khác hàng");
    }

    public function Delete($id)
    {
        $check = Phieubanhang::where("khachhangId", $id)->count();
        if ($check == 0) {
            Khachhang::destroy($id);
            return $this->Result("Đã xóa khách khách");
        } else {
            return $this->Result("Không thẻ xóa khách hàng do đã phát sinh dữ liệu");
        }
    }
}

<?php

namespace App\Http\Services;

use App\Models\Donvitinh;
use Illuminate\Http\Request;

class UnitService extends BaseService
{

    public function List(Request $request)
    {
        $list = Donvitinh::all();
        return $list;
    }

    public function Save(Request $request)
    {
        Donvitinh::create($request->all());
        return $this->Result("Đã lưu đơn vị tính");
    }

    public function Update(Request $request)
    {
        $unit = Donvitinh::find($request->id);
        $unit->update($request->all());
        return $this->Result("Đã lưu đơn vị tính");
    }

    public function Delete($id)
    {
        Donvitinh::destroy($id);
        return $this->Result("Đã xóa đơn vị tính");
    }
}

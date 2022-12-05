<?php

namespace App\Http\Controllers;

use App\Http\Services\UnitService;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    private $service;
    public function __construct(UnitService $service)
    {
        $this->service = $service;
    }

    public function List(Request $request)
    {
        return $this->service->List($request);
    }

    public function Save(Request $request)
    {
        if ($request->id == 0) {
            return response()->json($this->service->Save($request));
        } else {
            return response()->json($this->service->Update($request));
        }
    }

    public function Delete($id)
    {
        return response()->json($this->service->Delete($id));
    }
}

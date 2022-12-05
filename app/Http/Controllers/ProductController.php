<?php

namespace App\Http\Controllers;

use App\Http\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $service;
    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }
    public function List()
    {
        return response()->json($this->service->List());
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
    public function ProductInfo($id)
    {
        return response()->json($this->service->ProductInfo($id));
    }
}

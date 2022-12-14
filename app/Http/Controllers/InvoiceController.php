<?php

namespace App\Http\Controllers;

use App\Http\Services\InvoiceService;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    private $service;
    public function __construct(InvoiceService $service)
    {
        $this->service = $service;
    }

    public function Save(Request $request)
    {
        if ($request->has('id') == false) {
            return response()->json($this->service->SaveInvoice($request));
        } else {
            return response()->json($this->service->UpdateInvoice($request));
        }
    }

    public function List()
    {
        return $this->service->List();
    }

    public function Delete($id)
    {
        return $this->service->Delete($id);
    }
}

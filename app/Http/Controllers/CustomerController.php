<?php

namespace App\Http\Controllers;

use App\Http\Services\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    private $service;
    public function __construct(CustomerService $service)
    {
        $this->service = $service;
    }

    public function List()
    {
        return $this->service->List();
    }

    public function Save(Request $request)
    {
        if ($request->id == 0) {
            return $this->service->Save($request);
        } else {
            return $this->service->Update($request);
        }
    }

    public function Delete($id)
    {
        return $this->service->Delete($id);
    }
}

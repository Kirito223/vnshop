<?php

namespace App\Http\Services;

use Illuminate\Support\Str;

class BaseService
{
    protected function Result(string $msg = null, bool $flag = true, $data = null)
    {
        switch ($data) {
            case null:
                return ['msg' => $msg, 'flag' => $flag];
            default:
                return ['data' => $data, 'msg' => $msg, 'flag' => $flag];
        }
    }
}

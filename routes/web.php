<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::view('{path?}', 'welcome');
#region Unit
Route::get("unit/list", [UnitController::class, 'List']);
Route::get("unit/delete/{id}", [UnitController::class, 'Delete']);
Route::post("unit/save", [UnitController::class, 'Save']);
#endregion

#region Product
Route::get("product/list", [ProductController::class, 'List']);
Route::get("product/delete/{id}", [ProductController::class, 'Delete']);
Route::get("product/info/{id}", [ProductController::class, 'ProductInfo']);
Route::post("product/save", [ProductController::class, 'Save']);
#endregion

#region Customer
Route::get("customer/list", [CustomerController::class, 'List']);
Route::get("customer/delete/{id}", [CustomerController::class, 'Delete']);
Route::post("customer/save", [CustomerController::class, 'Save']);
#endregion
<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LikedController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//php artisan serve --host=192.168.164.93 --port=8000
//php artisan serve --host=172.20.10.2 --port=8000
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

// Route::middleware(['auth:api'])->group(function () {
//     Route::get('/user/{id}/profile', [UserController::class, 'getUserProfile']);
// });
Route::get('/user/{id}/profile', [UserController::class, 'getUserProfile']);
Route::middleware('auth:api')->put('changePass', [UserController::class, 'changePassword']);

//Category
Route::apiResource('/category',CategoryController::class);
Route::get('/category/{id}/image', [CategoryController::class, 'getImageCategory']);

//Productw
Route::apiResource('/product', ProductController::class);
Route::get('/product/{id}/image', [ProductController::class, 'getImageProduct']);
Route::post('/product/search', [ProductController::class, 'search']);
Route::get('category/{id}/product', [ProductController::class, 'getProductByCategory']);
Route::post('product/{id}/update', [ProductController::class, 'update']);

//Car
Route::middleware('auth:api')->apiResource('/cart', CartController::class);

//Order
Route::middleware('auth:api')->apiResource('/order', OrderController::class);
Route::middleware('auth:api')->get('/order_history',[OrderController::class,'history']);
//Order Detail
Route::apiResource('order_detail',OrderDetailController::class);

//Like
Route::middleware('auth:api')->apiResource('/liked', LikedController::class);

<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CollectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'guest:api'],function (){
    Route::post("/register",[AuthController::class,"register"]);
    Route::post('/login',[AuthController::class,'login']);
});

Route::group(['middleware' => 'auth:api'],function (){
    Route::get('/me',[AuthController::class,'me']);
    Route::post('/logout',[AuthController::class,'logout']);

    Route::prefix("collection")->group(function (){

        Route::get("",[CollectionController::class,"index"]);
        Route::post("/{id}/make-default",[CollectionController::class,"makeDefault"]);
        Route::post("store",[CollectionController::class,"store"]);
        Route::delete("/delete/{id}",[CollectionController::class,"destroy"]);
        Route::put("/{id}/update",[CollectionController::class,"update"]);

    });
});



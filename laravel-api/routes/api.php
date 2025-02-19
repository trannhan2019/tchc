<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/phong-ban', [\App\Http\Controllers\PhongBanController::class, 'index']);
Route::get('/phong-ban/{phongBan}', [\App\Http\Controllers\PhongBanController::class, 'show']);
Route::post('/phong-ban', [\App\Http\Controllers\PhongBanController::class, 'store']);
Route::put('/phong-ban/{phongBan}', [\App\Http\Controllers\PhongBanController::class, 'update']);
Route::delete('/phong-ban/{phongBan}', [\App\Http\Controllers\PhongBanController::class, 'destroy']);
Route::get('/phong-ban/{phongBan}/edit', [\App\Http\Controllers\PhongBanController::class, 'edit']);

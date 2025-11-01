<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

// ログインと新規登録のルーティング
Route::post('/register', 'App\Http\Controllers\AuthController@register');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function() {
    // studentsのCRUDのルーティング
    Route::get('/students', 'App\Http\Controllers\StudentController@index');
    Route::post('/students', 'App\Http\Controllers\StudentController@store');
    Route::get('/students/{student:id}', 'App\Http\Controllers\StudentController@edit');
    Route::patch('/students/{student:id}', 'App\Http\Controllers\StudentController@update');
    Route::delete('/students/{student:id}', 'App\Http\Controllers\StudentController@delete');
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

// ログインと新規登録のルーティング
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');

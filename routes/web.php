<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/item/{itemid}/{pizzaname}', function ($itemid, $pizzaname) {
    return view('welcome');
});

Route::get('/cart/', function () {
    return view('welcome');
});

Route::get('/checkout/', function () {
    return view('welcome');
});

Route::get('/orders/', function () {
    return view('welcome');
});

Route::get('/account/', function () {
    return view('welcome');
});

Route::post('/auth/register', 'AuthController@register');
Route::post('/auth/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout');

Route::post('/order/place', 'OrderController@process');
Route::get('/order/list', 'OrderController@list');
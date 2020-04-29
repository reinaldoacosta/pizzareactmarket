<?php

namespace App\Http\Controllers;

use App\Orders;
use App\User;
use Illuminate\Http\Request;

class OrderController extends Controller {

    function process(Request $request) {

        try {
            if (Orders::create([
                'user_id' => ($request->session()->get('logged') ? $request->session()->get('userid') : 0 ) ,
                'first_name' => $request->get('firstname'),
                'last_name' => $request->get('lastname'),
                'address' => $request->get('address'),
                'apt_number' => $request->get('apt'),
                'city' => $request->get('city'),
                'items' => $request->get('orders'),
                'amount' => $request->get('amount'),
            ])) {
                return response(['result' => 'success']);
            }
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
    }

    function list(Request $request) {
        if (!$request->session()->get('logged')) {
            return response([]);
        }

        $user = User::find($request->session()->get('userid'));
        $orders = [];
        foreach ($user->orders as $order) {
            $orders[] = [
                'id' => $order->id,
                'first_name' => $order->first_name,
                'last_name' => $order->last_name,
                'address' => $order->address,
                'apt_number' => $order->apt_number,
                'city' => $order->city,
                'items' => $order->items,
                'amount' => $order->amount,
                'date' => $order->created_at,
            ];
        }

        return response((count($orders) > 0 ? $orders : []));
    }
}

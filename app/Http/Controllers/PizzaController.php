<?php

namespace App\Http\Controllers;

use App\Pizzas;
use Symfony\Component\VarDumper\VarDumper;

class PizzaController extends Controller {
    function welcome() {
        $pizzas = Pizzas::get();
        return response()->json($pizzas, 200);
    }
}

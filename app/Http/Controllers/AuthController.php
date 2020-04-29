<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller {

    protected $user;

    function __constructor() {

    }

    function register(Request $request) {
        $username = $request->get('username');
        $password = $request->get('password');

        try {
            /**
             * @todo CHANGE $password parameter to hashed value
             * For demostration purposes only the password is not hashed
             * This should never be done in production
             */
            if (User::create(['username' => $username, 'password' => $password])) {
                $user = User::where('username', '=', $username)->first();
                $request->session()->put('userid', $user->id);
                $request->session()->put('logged', true);
                return response(['result' => 'success', 'id' => $request->session()->get('userid'), 'username' => $username]);
            }
        } catch (\Throwable $th) {
            $message = $th->getMessage();
            if (stripos(strtolower($message), 'duplicate')) {
                return response(['result' => 'error', 'message' => 'User already exists']);
            }

        }
    }

    function login(Request $request) {
        //$request->session()->flush();

        if ($request->session()->get('logged')) {
            return response(['result' => 'success']);
        } else {
            /**
             * Check user data
             */

            $username = $request->get('username');
            $password = $request->get('password');

            $user = User::where([['username', '=', $username], ['password', '=', $password]])->first();

            if ($user) {
                $request->session()->put('logged', true);
                $request->session()->put('userid', $user->id);
                return response(['result' => 'success', 'id' => $request->session()->get('userid'), 'username' => $username]);
            }
        }
    }

    function logout(Request $request){
        $request->session()->flush();
        return redirect('/');
    }

}

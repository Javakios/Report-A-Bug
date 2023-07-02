<?php

namespace App\Http\Controllers\Login;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {

        $rules = [
            'name' => 'required|string',
            'password' => 'required|string'
        ];

        $data = $request->validate($rules);


        if (Auth::attempt($data)) {
            $user = User::where('name', $data['name'])->first();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(
                [
                    'message' => 'success',
                    'user' => $user,
                    'token' => $token
                ],
                200
            );
        }
    }

    public function logout(Request $request)
    {
        $request->user('sanctum')->currentAccessToken()->delete();
        return response()->json(
            [
                'message' => 'success',
            ],
            200
        );
    }
}

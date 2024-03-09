<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            "email" => $request->input("email"),
            "password" => bcrypt($request->input("password"))
        ]);

        $token = $user->createToken("as_token")->plainTextToken;

        return response()->json(compact("token"));
    }

    public function login($request)
    {
        $user = User::where('email', $request->input("email"))->first();

        if (! $user || ! Hash::check($request->input("password"), $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken("as_token")->plainTextToken;

        return response()->json(compact("token"));
    }
}

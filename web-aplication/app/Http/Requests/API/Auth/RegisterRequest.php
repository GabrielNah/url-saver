<?php

namespace App\Http\Requests\API\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{


    public function rules(): array
    {
        return [
            "email"=>"required|email|unique:users,email",
            "password"=>"required|string|min:8|confirmed",
            "password_confirmation"=>"required|string|same:password",
        ];
    }
}

<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Auth::viaRequest("api-token-driver",function (Request $request){

            if (!$request->bearerToken()) {
                return null;
            }

            $pos = strpos($request->bearerToken(), '|');

            if ($pos === false) {
                return null;
            }

            $substringAfterPipe = hash('sha256',substr($request->bearerToken(), $pos + 1));

            return User::whereHas("tokens",function ($q) use ($substringAfterPipe) {
                        $q->where("token",$substringAfterPipe);
                   })->first();

        });
    }
}

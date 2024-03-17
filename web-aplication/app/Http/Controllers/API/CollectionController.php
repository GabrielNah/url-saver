<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\API\CollectionResource;
use Illuminate\Http\Request;

class CollectionController extends ApiController
{
    public function index()
    {
        return $this->successResponse([
            "collections" => CollectionResource::collection(
                auth()->user()->collections()->get(["id","user_id","name","description","is_default","url_count"])
            )
        ]);
    }
}

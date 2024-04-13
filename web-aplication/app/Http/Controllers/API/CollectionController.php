<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\API\CollectionResource;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function makeDefault(int $collectionID)
    {
        $user_id = auth()->id();

        DB::statement("
                UPDATE collections
                SET is_default = CASE
                                     WHEN id = $collectionID THEN 1
                                     ELSE 0
                                 END
                WHERE user_id = $user_id;
      ");

        return $this->successResponse();
    }

    public function store(Request $request)
    {
        Collection::create([
            "name"=>$request->input("name"),
            "description" => $request->input("description"),
            "user_id"=>auth()->id()
        ]);

        return $this->createdResponse();
    }
}

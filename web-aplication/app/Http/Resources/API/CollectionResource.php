<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CollectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->resource->id,
            "name"=>$this->resource->name ?? "",
            "description"=>$this->resource->description ?? "",
            "url_count"=>$this->resource->url_count,
            "is_default"=>$this->resource->is_default,
        ];
    }
}

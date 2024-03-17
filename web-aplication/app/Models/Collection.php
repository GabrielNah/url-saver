<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    const TABLE = "collections";

    protected $table = self::TABLE;

    protected $guarded = [ "id" ];

    protected $casts = [
        "is_default"=>"boolean"
    ];
}

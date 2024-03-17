<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    const TABLE = "urls";

    protected $table = self::TABLE;

    protected $guarded = [ "id" ];

}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

abstract class ApiController extends Controller
{
    public function successResponse(array $data=[],int $status = Response::HTTP_OK)
    {
        return response()->json(
            array_merge($data,["success"=>true]),$status
        );
    }

    public function createdResponse(array $data)
    {
        return $this->successResponse($data,Response::HTTP_CREATED);
    }

    public function deletedResponse()
    {
        return $this->successResponse([],Response::HTTP_NO_CONTENT);
    }
}

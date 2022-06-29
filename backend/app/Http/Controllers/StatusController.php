<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    public function index()
    {
        $statuses = Status::with(['attendance'])->get();
        return response()->json([
            'status' => 200,
            'data' => $statuses,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ]);
        } else {
            $status = Status::create($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Status Added Successfully',
                'data' => $status,
            ]);
        }
    }

    public function get($id)
    {
        $status = Status::find($id);
        if ($status) {
            return response()->json([
                'status' => 200,
                'Status' => $status,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Status ID Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $status = Status::find($id);
        if ($status) {
            $status->update($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Status Updated Successfully',
                'data' => $status,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Status ID Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $status = Status::find($id);
        if ($status) {
            $status->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Status Deleted Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Status ID Found',
            ]);
        }
    }
}

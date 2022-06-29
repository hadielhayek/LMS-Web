<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Support\Facades\Validator;
// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::with(['student'])->get();
        return response()->json([
            'status' => 200,
            'data' => $attendances,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer|min:1',
            'date' => 'required|date',
            'status_id' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ]);
        } else {
            $attendance = Attendance::create($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Attendance Added Successfully',
                'data' => $attendance,
            ]);
        }
    }


    public function get($id)
    {
        $attendance = Attendance::find($id);
        if ($attendance) {
            return response()->json([
                'status' => 200,
                'Attendance' => $attendance,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Attendance ID Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $attendance = Attendance::find($id);
        if ($attendance) {
            $attendance->update($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Attendance Updated Successfully',
                'data' => $attendance,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Attendance ID Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $attendance = Attendance::find($id);
        if ($attendance) {
            $attendance->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Attendance Deleted Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Attendance ID Found',
            ]);
        }
    }
}

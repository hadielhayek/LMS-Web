<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Std_Class;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{

    public function index()
    {
        $students = Student::with(['section', 'std__class'])->get();
        $count = Student::count();
        return response()->json([
            'status' => 200,
            'data' => $students,
            'count' => $count
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required',
            'std__class_id' => 'required|integer',
            'section_id' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ]);
        } else {
            $class = Std_Class::find($request->std__class_id);
            $section = Section::find($request->section_id);
            if (!$class) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Class does not exist',
                ]);
            }
            if (!$section) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Section does not exist',
                ]);
            }
            if ($files = $request->file('image')) {
                $destinationPath = 'image/'; // upload path to public folder
                $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
                $files->move($destinationPath, $profileImage); // to access image from frontend http://localhost:8000/image/20220321210916.jpg
            }
            $student = Student::create($request->all());
            return response()->json([
                'status' => 201,
                'message' => 'Student Added Successfully',
                'data' => $student,
            ]);
        }
    }

    public function get($id)
    {
        $student = Student::with(['section', 'std__class'])->where('id', $id)->get()->first();
        if ($student) {
            return response()->json([
                'status' => 200,
                'data' => $student,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required',
            'std__class_id' => 'required|integer',
            'section_id' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ]);
        } else {
            $student = Student::find($id);
            if ($student) {

                $class = Std_Class::find($request->input('std__class_id'));
                if (!$class) {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Class does not exist',
                    ]);
                }
                $section = Section::find($request->input('section_id'));
                if (!$section) {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Section does not exist',
                    ]);
                }
                $student->update($request->all());
                $student = Student::with(['section', 'std__class'])->where('id', $id)->get();
                return response()->json([
                    'status' => 201,
                    'message' => 'Student Updated Successfully',
                    'data' => $student,
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Student ID Found',
                ]);
            }
        }
    }


    public function destroy($id)
    {
        $student = Student::find($id);
        if ($student) {
            $student->delete();
            $students = Student::with(['section', 'std__class'])->get();
            return response()->json([
                'status' => 200,
                'message' => 'Student Deleted Successfully',
                'data' => $students,

            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }
}

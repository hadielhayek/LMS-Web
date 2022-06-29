<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Std_Class;
use App\Models\Course;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\FuncCall;
use Symfony\Contracts\Service\Attribute\Required;

class Std_ClassController extends Controller
{

    // getAll Classes
    public function getAll()
    {
        $std_class = Std_Class::orderby('name', 'Asc')->get();
        $count = Std_Class::count();
        $response = [
            'status' => 200,
            'message' => 'Get All Classes done!',
            'data' => $std_class,
            'count' => $count
        ];
        return response($response, 200);
    }

    // get Class by id
    public function get($id)
    {
        $std_class = Std_Class::find($id);
        $std_class->courses;

        if (!isset($std_class)) {
            $response = [
                'status' => 401,
                'message' => "Class $id not exist",
                'data' => null
            ];
            return response($response, 401);
        }
        $response = [
            'status' => 200,
            'message' => "Get Class $id done!",
            'data' => $std_class
        ];
        return response($response, 200);
    }

    // Add new Class
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'course' => 'integer'
            ]
        );
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        // if Course not exist
        $course_id = $request->course;
        if (isset($course_id)) {
            $course = Course::find($course_id);
            if (!isset($course)) {
                $response = [
                    'status' => 401,
                    'message' => "Course $course_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if Class already exist
        $name = $request->name;
        $std_class = Std_Class::where('name', $name)->first();
        if (isset($std_class)) {
            $response = [
                'status' => 401,
                'message' => "Class $name already exist, added failed!",
                'data' => null
            ];
            return response($response, 401);
        }

        $std_class = new Std_Class;
        $std_class->name = $request->name;
        $std_class->save();
        $std_class->courses()->attach($request->course);
        $response = [
            'status' => 200,
            'message' => 'Class added successfully!',
            'data' => $std_class
        ];
        return response($response, 200);
    }

    // Update Class
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'course' => 'integer'
            ]
        );
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        // if Course not exist
        $course_id = $request->course;
        if (isset($course_id)) {
            $course = Course::find($course_id);
            if (!isset($course)) {
                $response = [
                    'status' => 401,
                    'message' => "Course $course_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if course already exist in this class
        $std_class = Std_Class::find($id);
        if (isset($std_class)) {
            $std_class = Std_Class::find($id)->courses->contains($course_id); // output boolean: true or false
            if ($std_class) {
                $response = [
                    'status' => 401,
                    'message' => "Course choosed already exist in this Class",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        $std_class = Std_Class::find($id);
        if (isset($std_class)) {
            $std_class->update($request->all());
            $std_class->courses()->attach($request->course);
            $response = [
                'status' => 200,
                'message' => "Class updated successfully!",
                'data' => $std_class
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Class $id not exist, update failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete Class
    public function delete($id)
    {
        $std_class = Std_Class::find($id);
        if (isset($std_class)) {
            $std_class->delete();
            $all_std_classes = Std_Class::orderby('name', 'Asc')->get();
            $response = [
                'status' => 200,
                'message' => "Class deleted successfully!",
                'data' => $all_std_classes
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Class $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }
}

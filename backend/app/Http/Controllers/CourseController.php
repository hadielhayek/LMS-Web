<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Std_Class;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{

    // getAll Courses
    public function getAll()
    {
        $course = Course::orderby('name', 'Asc')->get();
        $count = Course::count();
        $response = [
            'status' => 200,
            'message' => 'Get All Courses done!',
            'data' => $course,
            'count' => $count
        ];
        return response($response, 200);
    }

    // get Course by id
    public function get($id)
    {
        $course = Course::find($id);

        if (!isset($course)) {
            $response = [
                'status' => 401,
                'message' => "Course $id not exist",
                'data' => null
            ];
            return response($response, 401);
        }
        $response = [
            'status' => 200,
            'message' => "Get Course $id done!",
            'data' => $course
        ];
        return response($response, 200);
    }

    // Add new Course
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'class' => 'integer'
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

        // if Class not exist
        $class_id = $request->class;
        if (isset($class_id)) {
            $class = Std_Class::find($class_id);
            if (!isset($class)) {
                $response = [
                    'status' => 401,
                    'message' => "Class $class_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if Course already exist
        $name = $request->name;
        $course = Course::where('name', $name)->first();
        if (isset($course)) {
            $response = [
                'status' => 401,
                'message' => "Course already exist, added failed!",
                'data' => null
            ];
            return response($response, 401);
        }

        $course = new Course;
        $course->name = $request->name;
        $course->save();
        $course->std__class()->attach($request->class);
        $response = [
            'status' => 200,
            'message' => 'Course added successfully!',
            'data' => $course
        ];
        return response($response, 200);
    }

    // Update Course
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'class' => 'integer'
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

        // if Class not exist
        $class_id = $request->class;
        if (isset($class_id)) {
            $class = Std_Class::find($class_id);
            if (!isset($class)) {
                $response = [
                    'status' => 401,
                    'message' => "Class $class_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if class already exist in this course
        $course = Course::find($id);
        if (isset($course)) {
            $course = Course::find($id)->std__class->contains($class_id); // output boolean: true or false
            if ($course) {
                $response = [
                    'statcourseus' => 401,
                    'message' => "Class $class_id already exist in this Course",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        $course = Course::find($id);
        if (isset($course)) {
            $course->update($request->all());
            $course->std__class()->attach($request->class);
            $response = [
                'status' => 200,
                'message' => "Course updated successfully!",
                'data' => $course
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Course $id not exist, update failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete Course
    public function delete($id)
    {
        $course = Course::find($id);
        if (isset($course)) {
            $course->delete();
            $all_courses = Course::orderby('name', 'Asc')->get();
            $response = [
                'status' => 200,
                'message' => "Course deleted successfully!",
                'data' => $all_courses
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Course $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Detach a Course from Class
    public function detach(Request $request, $id)
    {
        $course = Course::find($id);
        if (isset($course)) {
            $course->std__class()->detach($request->class); // ->detach() detach all classes || ->detach(1) detach class 1 just
            $response = [
                'status' => 200,
                'message' => "Course detached successfully!",
                'data' => $course
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Error when detached course!",
            'data' => null
        ];
        return response($response, 401);
    }
}

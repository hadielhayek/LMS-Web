<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\Std_Class;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SectionController extends Controller
{

    // Get All Sections
    public function getAll()
    {
        $section = Section::with(['std__class', 'students'])->get();
        $response = [
            'status' => 200,
            'message' => 'get All Sections done!',
            'data' => $section
        ];
        return response($response, 200);
    }

    // Get Section by id
    public function get($id)
    {
        $section = Section::with(['students', 'std__class'])->where('id', $id)->get()->first();
        if (isset($section)) {
            $response = [
                'status' => 200,
                'message' => "get Section $id done!",
                'data' => $section
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Section $id not exist",
            'data' => null
        ];
        return response($response, 401);
    }

    // Add new Section
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'std__class_id' => 'required|integer'
            ]
        );

        // a message for every field required
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        $std_class_id = $request->std__class_id;
        $std_class = Std_Class::find($std_class_id);
        // if Class not exist in database
        if (!isset($std_class)) {
            $response = [
                'status' => 401,
                'message' => "Class $std_class_id not exist",
                'data' => null
            ];
            return response($response, 401);
        }

        // if Section already exist in the same Class
        $name = $request->name;
        $std__class_id = $request->std__class_id;
        $section = Section::where('name', $name)->where('std__class_id', $std__class_id)->first();

        // OR
        // $section = Section::where([
        //     ['name', $name],
        //     ['std__class_id', $std__class_id]
        //     ])->first();
        if (isset($section)) {
            $response = [
                'status' => 401,
                'message' => "Section $name already exist in Class choosed, added failed!",
                'data' => null
            ];
            return response($response, 401);
        }

        $section = new Section;
        $section->name = $request->name;
        $section->std__class_id = $request->std__class_id;
        $section->save();
        $section->std__class;
        $response = [
            'status' => 200,
            'message' => 'Section added successfully!',
            'data' => $section
        ];
        return response($response, 200);
    }

    // Update Section
    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                //'std__class_id' => 'required|integer'
            ]
        );

        // a message for every field required
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        // if section id not exist in database
        if (!isset($section)) {
            $response = [
                'status' => 401,
                'message' => "Section $id not exist, update failed!",
                'data' => null
            ];
            return response($response, 401);
        }

        // $std_class_id = $request->std__class_id;
        // $std_class = Std_Class::find($std_class_id);
        // // if Class id not exist in database
        // if (!isset($std_class)) {
        //     $response = [
        //         'status' => 401,
        //         'message' => "Class $std_class_id not exist, update failed!",
        //         'data' => null
        //     ];
        //     return response($response, 401);
        // }

        $section->update($request->all());
        $section->std__class;
        $response = [
            'status' => 200,
            'message' => "Section updated successfully!",
            'data' => $section
        ];
        return response($response, 200);
    }

    // Delete Section
    public function delete($id)
    {
        $section = Section::find($id);
        if (isset($section)) {
            $section->delete();
            $all_sections = Section::orderby('name', 'Asc')->get();
            $response = [
                'status' => 200,
                'message' => "Section deleted successfully!",
                'data' => $all_sections
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Section $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }
}

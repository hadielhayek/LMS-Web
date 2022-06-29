<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
<<<<<<< HEAD
    public function index()
    {
        $admin = Admin::all();
        return response()->json([
            'status' => 200,
            'admins' => $admin,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:3',
            'phone' => 'required',
            'image' => 'string',
            // 'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
=======
    // public function index()
    // {
    //     $admins = Admin::all();
    //     return response()->json([
    //         'status' => 200,
    //         'admins' => $admins,
    //     ]);
    // }

    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'full_name' => 'required',
    //         'email' => 'required|email',
    //         'password' => 'required|min:3',
    //         'phone' => 'required',
    //         'image' => 'required',
    //         // 'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
    //     ]);
>>>>>>> 952c95f3c2e688e533690d4ed097342c8947fcce

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 401,
    //             'errors' => $validator->errors(),
    //         ]);
    //     } else {
    //         $admin = Admin::create($request->all());
    //         return response()->json([
    //             'status' => 201,
    //             'message' => 'Admin Added Successfully',
    //             'data' => $admin,
    //         ]);
    //     }
    // }


    // public function get($id)
    // {
    //     $admin = Admin::find($id);
    //     if ($admin) {
    //         return response()->json([
    //             'status' => 200,
    //             'data' => $admin,
    //         ]);
    //     } else {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'No Admin ID Found',
    //         ]);
    //     }
    // }

    // public function update(Request $request, $id)
    // {

    //     $admin = Admin::find($id);
    //     if ($admin) {
    //         $admin->update($request->all());
    //         return response()->json([
    //             'status' => 200,
    //             'message' => 'Admin Updated Successfully',
    //             'data' => $admin,
    //         ]);
    //     } else {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'No Admin ID Found',
    //         ]);
    //     }
    // }


<<<<<<< HEAD
    public function destroy($id)
    {
        $admin = Admin::find($id);
        if ($admin) {
            $admin->delete();
            $admins = Admin::all();
            return response()->json([
                'status' => 200,
                'message' => 'Admin Deleted Successfully',
                'admins'=> $admins
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Admin ID Found',
            ]);
        }
    }
=======
    // public function destroy($id)
    // {
    //     $admin = Admin::find($id);
    //     if ($admin) {
    //         $admin->delete();
    //         return response()->json([
    //             'status' => 200,
    //             'message' => 'Admin Deleted Successfully',
    //         ]);
    //     } else {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'No Admin ID Found',
    //         ]);
    //     }
    // }
>>>>>>> 952c95f3c2e688e533690d4ed097342c8947fcce
}


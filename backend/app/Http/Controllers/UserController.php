<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    // Get All Users
    public function getAll()
    {
        $users = User::all();
        $count = User::count();
        return response()->json([
            'status' => 200,
            'message' => 'Get All Users done!',
            'data' => $users,
            'count' => $count
        ]);
    }

    // Get User by ID
    public function get($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 200,
                'data' => $user,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User ID Found',
            ]);
        }
    }

    // Update User
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                
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
        if ($user) {
            $user->update($request->all());
            return response()->json([
                'status' => 200,
                'message' => 'User Updated Successfully!',
                'data' => $user,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User ID Found',
            ]);
        }
    }

    // Delete User
    public function delete($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            $users = User::all();
            return response()->json([
                'status' => 200,
                'message' => 'User Deleted Successfully!',
                'data' => $users
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User ID Found',
            ]);
        }
    }

    // Login user
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid email or password, please check it!'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    // Register user
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                // 'password' => 'required|string|min:6',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',

                'phone' => 'required'
            ],
            [
                'password.regex' => 'password should contain at least one uppercase, lowercase, numeric & special character(!,@,#,$,%,^,*)'
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        if ($files = $request->file('image')) {
            $destinationPath = 'image/'; // upload path to public folder
            $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage); // to access image from frontend http://localhost:8000/image/20220321210916.jpg
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'image' => $profileImage,
            'phone' => $request->get('phone')
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user', 'token'), 201);
    }

    // method which returns the user object based on the authorization token that is passed.
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }
}

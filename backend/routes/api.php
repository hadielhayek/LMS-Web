<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\AdminController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Std_ClassController;
use App\Http\Controllers\StudentController;

// authentication Routes
Route::post('login', [UserController::class, 'authenticate']);

Route::group(['middleware' => ['jwt.verify']], function () {

    // Register user
    Route::post('register', [UserController::class, 'register']);
    // Get the authenticated user data
    Route::get('logeduser', [UserController::class, 'getAuthenticatedUser']);

   

    //Students Routes
    Route::group(['prefix' => 'student'], function () {
        Route::get('/', [StudentController::class, 'index']);
        Route::get('/{id}', [StudentController::class, 'get']);
        Route::post('/', [StudentController::class, 'store']);
        Route::put('/{id}', [StudentController::class, 'update']);
        Route::delete('/{id}', [StudentController::class, 'destroy']);
    });

    // Admin Routes
    // Route::group(['prefix' => 'admin'], function () {
    //     Route::get('/', [AdminController::class, 'index']);
    //     Route::get('/{id}', [AdminController::class, 'get']);
    //     Route::post('/', [AdminController::class, 'store']);
    //     Route::put('/{id}', [AdminController::class, 'update']);
    //     Route::delete('/{id}', [AdminController::class, 'destroy']);
    // });

    // Admin Routes
    Route::group(['prefix' => 'admin'], function () {
        Route::get('/', [UserController::class, 'getAll']);
        Route::get('/{id}', [UserController::class, 'get']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'delete']);
    });

    // Status Routes
    Route::group(['prefix' => 'status'], function () {
        Route::get('/', [StatusController::class, 'index']);
        Route::get('/{id}', [StatusController::class, 'get']);
        Route::post('/', [StatusController::class, 'store']);
        Route::put('/{id}', [StatusController::class, 'update']);
        Route::delete('/{id}', [StatusController::class, 'destroy']);
    });

    // Attendance Routes
    Route::group(['prefix' => 'attendance'], function () {
        Route::get('/', [AttendanceController::class, 'index']);
        Route::get('/{id}', [AttendanceController::class, 'get']);
        Route::post('/', [AttendanceController::class, 'store']);
        Route::put('/{id}', [AttendanceController::class, 'update']);
        Route::delete('/{id}', [AttendanceController::class, 'destroy']);
    });

    // Std_Class Routes
    Route::group(['prefix' => 'class'], function () {
        Route::get('/', [Std_ClassController::class, 'getAll']);
        Route::get('/{id}', [Std_ClassController::class, 'get']);
        Route::post('/', [Std_ClassController::class, 'create']);
        Route::put('/{id}', [Std_ClassController::class, 'update']);
        Route::delete('/{id}', [Std_ClassController::class, 'delete']);
    });

    // Section Routes
    Route::group(['prefix' => 'section'], function () {
        Route::get('/', [SectionController::class, 'getAll']);
        Route::get('/{id}', [SectionController::class, 'get']);
        Route::post('/', [SectionController::class, 'create']);
        Route::put('/{id}', [SectionController::class, 'update']);
        Route::delete('/{id}', [SectionController::class, 'delete']);
    });

    // Course Routes
    Route::group(['prefix' => 'course'], function () {
        Route::get('/', [CourseController::class, 'getAll']);
        Route::get('/{id}', [CourseController::class, 'get']);
        Route::post('/', [CourseController::class, 'create']);
        Route::put('/{id}', [CourseController::class, 'update']);
        Route::delete('/{id}', [CourseController::class, 'delete']);
        Route::post('/detach/{id}', [CourseController::class, 'detach']);
    });
});

Route::group(['prefix' => 'test'], function () {
    Route::get('/', [UserController::class, 'getAll']);
    Route::get('/{id}', [UserController::class, 'get']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

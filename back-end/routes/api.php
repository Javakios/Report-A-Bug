<?php

use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\Steps\StepsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::resource('projects', ProjectController::class)->except(['create', 'edit']);
Route::resource('users', UserController::class)->except(['create', 'edit']);
Route::resource('tickets', TicketController::class)->except(['create', 'edit']);
Route::resource('tickets.steps', StepsController::class)->except(['destroy']);

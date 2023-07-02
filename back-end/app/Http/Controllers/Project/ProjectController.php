<?php

namespace App\Http\Controllers\Project;

use App\Models\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all();

        return response()->json(
            [
                'message' => 'success',
                'projects' => $projects
            ],
            200
        );
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'user_id' => [
                'required', 'integer',
                Rule::exists('users', 'id')
            ]
        ];

        $data = $request->validate($rules);
        $data['status'] = Project::DEVELOPMENT_STATE;
        $project = Project::create($data);

        return response()->json(
            [
                'message' => 'success',
                'project' => $project
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::findOrFail($id);

        return response()->json(
            [
                'message' => 'success',
                'project' => $project
            ],
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        $rules = [
            'name' => 'string',
            'description' => 'string',
            'status' => [
                'string',
                Rule::in([Project::DEVELOPMENT_STATE, Project::PRODUCTION_STATE])
            ],
            'user_id' => [
                'integer',
                Rule::exists('users', 'id')
            ]
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(
            [
                'message' => 'success',
                'project' => $project
            ],
            200
        );
    }
}

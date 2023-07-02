<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Steps;
use Illuminate\Http\Request;
use App\Models\Ticket;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ticket = Ticket::all();
        return response()->json(
            [
                'message' => 'success',
                'ticket' => $ticket
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
            'desciption' => 'required|string',
            'status' => 'required|string',
            'project_id' => [
                'required', 'integer',
                Rule::exists('projects', 'id')
            ],
            'user_id' => [
                'required', 'integer',
                Rule::exists('users', 'id')
            ],
            'steps' => 'array'
        ];
        $data = $request->validate($rules);
        $data['status'] = Ticket::OPEN_STATUS;
        $ticket = Ticket::create($data);

        $stepsData = $data['steps'];
        $steps = [];

        foreach ($stepsData as $stepData) {
            $step = new Steps([
                'name' => $stepData['name'],
                'description' => $stepData['description'],
                'ticket_id' => $ticket->id
            ]);

            // Associate the step with the ticket
            $ticket->steps()->save($step);

            $steps[] = $step;
        }

        return response()->json(
            [
                'message' => 'success',
                'ticket' => $ticket,
                'steps' => $steps
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ticket = Ticket::findOrFail($id);

        return response()->json(
            [
                'message' => 'success',
                'ticket' => $ticket
            ],
            200
        );
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ticket = Ticket::findOrFail($id);
        $rules = [
            'name' => 'string',
            'desciption' => 'string',
            'status' => 'string',
            'steps' => 'array'
        ];
        $data = $request->validate($rules);

        if ($request->has('name')) {
            $ticket->name = $data['name'];
        }
        if ($request->has('desciption')) {
            $ticket->desciption = $data['desciption'];
        }
        if ($request->has('status') && !$ticket->isCompleted()) {
            $ticket->status = Ticket::COMPLETED_STATUS;
        }

        $ticket->save();

        $stepsData = $request->input('steps', []);

        foreach ($stepsData as $stepData) {
            $step = Steps::findOrFail($stepData['id']);
            $step->name = $stepData['name'];
            $step->description = $stepData['description'];
            $step->save();
        }

        return response()->json(
            [
                'message' => 'success',
                'ticket' => $ticket
            ],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();
        return response()->json(
            [
                'message' => 'success',
                'ticket' => $ticket
            ],
            200
        );
    }
}

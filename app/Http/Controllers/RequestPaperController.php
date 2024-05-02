<?php

namespace App\Http\Controllers;

use App\Models\RequestPaper;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RequestPaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Paginate the filtered records
        $requestpapers = RequestPaper::with('user.student', 'paper')->paginate(5);
        // foreach ($requestpapers as $requestpaper) {
        //     $userid = $requestpaper->user;
        //     dd($userid->toArray()); // Check the user attributes and relationships

        // }



        // Return the view with the filtered request papers and user information
        return Inertia::render('Request/Admin/AdminView', [
            'requestpapers' => $requestpapers,
        ]);
    }

    public function view(Request $request)
    {
        // Get the user ID from the request parameters
        $userId = $request->query('user_id');


        // Query RequestPaper records with the user ID
        $query = RequestPaper::query()->with('user','paper');

        // If user ID is provided, filter the records by user ID
        if ($userId) {
            $query->where('user_id', $userId);
        }

        // Paginate the filtered records
        $requestpapers = $query->paginate(5);

        // Return the view with the filtered request papers and user information
        return Inertia::render('Request/User/View', [
            'requestpapers' => $requestpapers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'purpose' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id', 
            'paper_id' => 'required|exists:papers,id', 
        ]);
    
        // Add user_id and paper_id to the validated data
        $validatedData['user_id'] = $request->user_id;
        $validatedData['paper_id'] = $request->paper_id;
    
        RequestPaper::create($validatedData);

        return to_route('userpapers.preview', ['paper' => $request->paper_id])
        ->with('success', 'Submitted Successfully');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(RequestPaper $requestPaper)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RequestPaper $requestPaper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RequestPaper $requestPaper)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestPaper $requestPaper)
    {
        $requestPaper->delete();
    }
}

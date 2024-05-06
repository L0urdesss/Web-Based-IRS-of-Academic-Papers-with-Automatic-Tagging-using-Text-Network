<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Paper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class PaperController extends Controller
{
    public function index(Request $request)
    {
        $query = Paper::query();
    
        if ($request->has('searchQuery')) {
            $query->where('title', 'like', '%' . $request->input('searchQuery') . '%');
            // Add more search conditions if needed
        }
    
        $papers = $query->paginate(3);

    
        return Inertia::render('Papers/Admin/All', [
            'papers' => $papers,
            'searchQuery' => $request->input('searchQuery'), // Send back the search query to pre-fill the input field
        ]);
    }

    public function view(Request $request)
    {
        $query = Paper::query();
        
        // Apply search query if provided
        if ($request->has('searchQuery')) {
            $searchTerm = $request->input('searchQuery');
            $query->where(function($query) use ($searchTerm) {
                $query->where('title', 'like', '%' . $searchTerm . '%')
                      ->orWhere('author', 'like', '%' . $searchTerm . '%')
                      ->orWhere('date_published', 'like', '%' . $searchTerm . '%');
            });
        }
    
        // Apply additional filters if selected
        if ($request->has('filters')) {
            $filters = $request->input('filters');
            $query->where(function($query) use ($filters, $searchTerm) {
                if ($filters['title']) {
                    $query->orWhere('title', 'like', '%' . $searchTerm . '%');
                }
                if ($filters['author']) {
                    $query->orWhere('author', 'like', '%' . $searchTerm . '%');
                }
                if ($filters['date_published']) {
                    $query->orWhere('date_published', 'like', '%' . $searchTerm . '%');
                }
            });
        }
        
        $papers = $query->paginate(5);
        
        return Inertia::render('Papers/User/ViewAll', [
            'papers' => $papers,
            'searchQuery' => $request->input('searchQuery'), 
        ]);
    }
    

    
    public function edit(Paper $paper)
    {
        return Inertia::render('Papers/Admin/Edit',[
            'paper' => $paper
        ]);
    }

    public function preview(Paper $paper)
    {
        $user = Auth::user(); // Fetch authenticated user

        $status = (new RequestPaperController())->getStatus($user->id, $paper->id);

        return Inertia::render('Papers/User/Preview',[
            'paper' => $paper,
            'status' => $status,
            'success' => session('success')
        ]);
    }

    public function update(Paper $paper, Request $request):void
    {    
        dd($request); // or var_dump($paper);

        $paper->update([
            'title' => $request->title,
            'abstract' => $request->abstract,
            'author' => $request->author,
            'course' => $request->course,
            'date_published' => $request->date_published,
            'file' => $request->file,
        ]);
    }

    public function store(Request $request): void
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'author' => 'required|string', 
            'course' => 'required|string',
            'file' => 'nullable|extensions:pdf',
            'date_published' => 'required|string',
        ]);
        
        $filepath = $validatedData['file'] ?? null;
        if ($filepath){
            $validatedData['file'] = $filepath->store('project/' . $validatedData['title'], 'public');
        }
        
        Paper::create($validatedData);
    
    }

    public function add()
    {
        return Inertia::render('Papers/Admin/Add');
    }
    
    public function destroy(Paper $paper): void
    {
        $paper->delete();
    }
}

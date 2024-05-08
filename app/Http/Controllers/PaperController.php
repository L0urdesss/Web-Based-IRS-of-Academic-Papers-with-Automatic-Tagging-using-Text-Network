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
            $searchTerms = explode(' ', $request->input('searchQuery'));
        }
        
        // Apply additional filters if selected
        if ($request->has('filters')) {
            $filters = $request->input('filters');
            $query->where(function($query) use ($filters, $searchTerms) {
                foreach ($searchTerms as $term) {
                    $query->where(function($query) use ($term, $filters) {
                        // Check if the term matches any of the specified filters
                        foreach ($filters as $filter) {
                            $query->orWhere($filter, 'like', '%' . $term . '%');
                        }
                    });
                }
            });
        }
    
        // Apply sorting if sortOrder is provided
        if ($request->has('sortOrders')){
            $sortOrder = $request->input('sortOrders');
            if ($sortOrder === 'asc') {
                $query->orderBy('title', 'asc');
            } elseif ($sortOrder === 'desc') {
                $query->orderBy('title', 'desc');
            }
        }
    
        // Apply sorting if sortCourse is provided
        if ($request->has('sortCourse') && $request->input('sortCourse') !== null){
            $sortCourse = $request->input('sortCourse');
            $query->where('course', $sortCourse);
        }
        
        $papers = $query->paginate(5);
        
        return Inertia::render('Papers/User/ViewAll', [
            'papers' => $papers,
            'searchQuery' => $request->input('searchQuery'), 
            'filters' => $request->input('filters'), 
            'sortOrders' => $request->input('sortOrders'), 
            'sortCourse' => $request->input('sortCourse'), 

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

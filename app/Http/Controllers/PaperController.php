<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Paper;
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
    
        if ($request->has('searchQuery')) {
            $query->where('title', 'like', '%' . $request->input('searchQuery') . '%');
        }
    
        $papers = $query->paginate(3);
    
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

    public function update(Paper $paper, Request $request):void
    {
        $paper->update([
            'title' => $request->title,
            'abstract' => $request->abstract,
            'author' => $request->author,
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
            'date_published' => 'required|string',
        ]);
    
        $validatedData['file'] = 'file.pdf';
    
        $validatedData['user_id'] = Auth::id(); 
    
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

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Paper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Illuminate\Support\Str;
use App\Rules\YearBelowCurrent;

class PaperController extends Controller
{
    public function index(Request $request)
    {
        $query = Paper::query();
    
        if ($request->has('searchQuery')) {
            $query->where('title', 'like', '%' . $request->input('searchQuery') . '%');
            // Add more search conditions if needed
        }
    
        $papers = $query->paginate(7);

    
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

        if ($request->has('paperFile')) {
            if ($request->input('paperFile') == 'true'){
                // Get only non-null 'file' field
                $query->whereNotNull('file');
            }
        }

        if ($request->has('paperDate')){
            $paperDate = $request->input('paperDate');
            $currentYear = date('Y');
    
            if (is_string($paperDate)) {
                if ($paperDate == '1') {
                    $query->where('date_published', '>=', $currentYear - 1);
                } elseif ($paperDate == '3') {
                    $query->where('date_published', '>=', $currentYear - 3);
                }
            } elseif (is_array($paperDate) && count($paperDate) == 2) {
                $startYear = $paperDate[0];
                $endYear = $paperDate[1];
                $query->where('date_published', '>=', $startYear)
                      ->where('date_published', '<=', $endYear);
            }
        }
        \Log::info($request);
        
        $papers = $query->paginate(7);
        
        return Inertia::render('Papers/User/ViewAll', [
            'papers' => $papers,
            'searchQuery' => $request->input('searchQuery'), 
            'filters' => $request->input('filters'), 
            'sortOrders' => $request->input('sortOrders'), 
            'sortCourse' => $request->input('sortCourse'), 
            'paperFile' => $request->input('paperFile'), 
            'paperDate' => $request->input('paperDate'), 

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

    public function update(Paper $paper, Request $request)
    {    
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'author' => 'required|string', 
            'course' => 'required|string',
            'file' => 'nullable|file|mimes:pdf',
            'date_published' => ['required', 'string', new YearBelowCurrent()],
        ]);
    
        // Get the old file path
        $oldFilePath = $paper->file;
    
        // Generate a clean file name without special characters
        $file = $request->file('file');
        $cleanFileName = $file ? Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension() : null;
    
        // Check if a file was uploaded and store it with the cleaned file name
        if ($file) {
            // Delete the old file if it exists
            if ($oldFilePath) {
                // Ensure the old file path is correct
                $oldFilePath = str_replace('/storage', '', $oldFilePath);
    
                // Debugging: Log the old file path
                \Log::info('Attempting to delete old file:', ['path' => $oldFilePath]);
                
                // Attempt to delete the old file
                $deleted = Storage::disk('public')->delete($oldFilePath);
                
                // Debugging: Log whether the file was deleted or not
                \Log::info('File deleted status:', ['status' => $deleted]);
            }
    
            // Store the new file with a cleaned file name
            $validatedData['file'] = $file->storeAs('project/' . Str::slug($validatedData['title']), $cleanFileName, 'public');
        }

        try {
            $status = $paper->update([
                'title' => $validatedData['title'],
                'abstract' => $validatedData['abstract'],
                'author' => $validatedData['author'],
                'course' => $validatedData['course'],
                'date_published' => $validatedData['date_published'],
                'file' => $validatedData['file'],
            ]);

            if($status){
                return redirect()->back()->with('success', 'Paper updated succesfully.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'An error occurred while creating the paper.');
        }

    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'author' => 'required|string',
            'course' => 'required|string',
            'file' => 'nullable|mimes:pdf',
            'date_published' => ['required', 'string', new YearBelowCurrent()],
        ]);
    
        if ($request->hasFile('file')) {
            $filepath = $request->file('file')->store('project/' . $validatedData['title'], 'public');
            $validatedData['file'] = $filepath;
        }
    
        try {
            $status = Paper::create($validatedData);
            if($status){
                return redirect('/papers-admin')->with('success', 'Paper added successfully.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'An error occurred while creating the paper.');
        }
    }
    
    

    public function add()
    {
        return Inertia::render('Papers/Admin/Add');
    }
    
    public function destroy(Paper $paper)
    {
    try {
        $status = $paper->delete();
        if($status){
            return redirect('/papers-admin')->with('success', 'Paper deleted successfully');
        }
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'An error occurred while deleting the paper');
    }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        //
    }

    public function view(Request $request)
    {
        $query = Student::query();
        if ($request->has('searchQuery')) {
            $searchQuery = '%' . $request->input('searchQuery') . '%';
            $query->where(function ($query) use ($searchQuery) {
                $query->where('name', 'like', $searchQuery)
                      ->orWhere('email', 'like', $searchQuery)
                      ->orWhere('course', 'like', $searchQuery)
                      ->orWhere('college', 'like', $searchQuery);
            });
        }
        
    
        $students = $query->paginate(7);
        
        return Inertia::render('Student/All', [
            'students' => $students,
            'searchQuery' => $request->input('searchQuery'), 
        ]);
    }
    
    public function edit(Student $student)
    {
        return Inertia::render('Student/Edit',[
            'student' => $student
        ]);
    }

    public function update(Student $student, Request $request):void
    {    
        // dd($request); // or var_dump($paper);

        $student->update([
            'email' => $request->email,
            'name' => $request->name,
            'course' => $request->course,
            'college' => $request->college,
        ]);
    }

    public function store(Request $request): void
    {
        $validatedData = $request->validate([
            'email' => 'required|string|max:255',
            'name' => 'required|string',
            'course' => 'required|string', 
            'college' => 'required|string',
        ]);
        
        Student::create($validatedData);
    }

    public function add()
    {
        return Inertia::render('Student/Add');
    }
    
    public function destroy(Student $student): void
    {
        $student->delete();
    }}

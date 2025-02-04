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

    public function update(Student $student, Request $request)
    {    
        // dd($request); // or var_dump($paper);

        $validatedData = $request->validate([
            'email' => 'required|email|string',
            'name' => 'required|string|max:255',
            'course' => 'required|string', 
            'college' => 'required|string',
        ]);

        try {
            $status = $student->update([
                'email' => $validatedData['email'],
                'name' => $validatedData['name'],
                'course' => $validatedData['course'],
                'college' => $validatedData['college'],
            ]);

            if($status){
                return redirect()->back()->with('success', 'Student updated succesfully.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'An error occurred while updating the student.');
        }

        
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|string',
            'name' => 'required|string|max:255',
            'course' => 'required|string', 
            'college' => 'required|string',
        ]);
    
        try {
            $status = Student::create($validatedData);
            if($status){
                return redirect('/student')->with('success', 'Student added successfully.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'An error occurred while creating the student.');
        }
    }

    public function add()
    {
        return Inertia::render('Student/Add');
    }
    
    public function destroy(Student $student)
    {
        try {
            $status = $student->delete();
            if($status){
                return redirect('/student')->with('success', 'Student deleted successfully');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while deleting the student');
        }
    }}

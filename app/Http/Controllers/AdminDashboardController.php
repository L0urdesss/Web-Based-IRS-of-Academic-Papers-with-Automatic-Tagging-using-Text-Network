<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Paper;
use App\Models\Student;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Fetch papers grouped by year
        $papersByYear = Paper::selectRaw('CAST(date_published AS UNSIGNED) as year, COUNT(*) as count')
            ->whereNotNull('date_published') // Ensure the date is valid
            ->whereNotNull('file') // Ensure a file exists
            ->where('file', '!=', '') // Ensure the file is not empty
            ->groupBy('year')
            ->orderBy('year')
            ->get();

        // Convert year to integer and count to integer
        $papersByYear = $papersByYear->map(function ($item) {
            return [
                'year' => (int) $item->year, // Convert the year to integer
                'count' => (int) $item->count, // Convert count to integer
            ];
        });

        // Fetch papers grouped by course
        $papersByCourse = Paper::selectRaw('course, COUNT(*) as count')
            ->groupBy('course')
            ->get();

        // Fetch total number of students
        $totalStudents = Student::count();

        // Fetch students grouped by course
        $studentsPerCourse = Student::selectRaw('course, COUNT(*) as count')
            ->groupBy('course')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->course => (int) $item->count];
            });

        // Render the data
        return Inertia::render('AdminDashboard', [
            'totalPapers' => Paper::count(),
            'papersByCourse' => $papersByCourse,
            'papersByYear' => $papersByYear,
            'totalStudents' => $totalStudents,
            'studentsPerCourse' => $studentsPerCourse,
        ]);
    }
}

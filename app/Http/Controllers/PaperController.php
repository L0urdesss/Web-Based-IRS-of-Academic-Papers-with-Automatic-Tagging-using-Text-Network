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

        $papers = $query->paginate(6);

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
            $query->where(function ($query) use ($filters, $searchTerms) {
                foreach ($searchTerms as $term) {
                    $query->where(function ($query) use ($term, $filters) {
                        // Check if the term matches any of the specified filters
                        foreach ($filters as $filter) {
                            $query->orWhere($filter, 'like', '%' . $term . '%');
                        }
                    });
                }
            });
        }

        // Apply sorting if sortOrder is provided
        if ($request->has('sortOrders')) {
            $sortOrder = $request->input('sortOrders');
            if ($sortOrder === 'asc') {
                $query->orderBy('title', 'asc');
            } elseif ($sortOrder === 'desc') {
                $query->orderBy('title', 'desc');
            }
        }

        // Apply sorting if sortCourse is provided
        if ($request->has('sortCourse') && $request->input('sortCourse') !== null) {
            $sortCourse = $request->input('sortCourse');
            $query->where('course', $sortCourse);
        }

        if ($request->has('paperFile')) {
            if ($request->input('paperFile') == 'true') {
                // Get only non-null 'file' field
                $query->whereNotNull('file');
            }
        }

        if ($request->has('paperDate')) {
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
        return Inertia::render('Papers/Admin/Edit', [
            'paper' => $paper
        ]);
    }

    public function preview(Paper $paper)
    {
        $user = Auth::user(); // Fetch authenticated user

        $status = (new RequestPaperController())->getStatus($user->id, $paper->id);

        return Inertia::render('Papers/User/Preview', [
            'paper' => $paper,
            'status' => $status,
            'success' => session('success')
        ]);
    }

    public function update(Paper $paper, Request $request)
    {
        \Log::info("inside update");
        \Log::info($request->all());

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'author' => 'required|string',
            'course' => 'required|string',
            'file' => 'nullable',
            'date_published' => ['required', 'string', new YearBelowCurrent()],
            'main_topic' => 'required|string',
            'subtopic' => 'required|string',
            'key_terms' => 'required|string',
        ]);
        \Log::info("1");

        // Get the old file path
        $oldFilePath = $paper->file;

        // Generate a clean file name without special characters
        $file = $request->file('file');
        $cleanFileName = $file ? Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension() : null;
        \Log::info("2");

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
        \Log::info(["inside update: ", $validatedData['file']]);

        try {
            $status = $paper->update([
                'title' => $validatedData['title'],
                'abstract' => $validatedData['abstract'],
                'author' => $validatedData['author'],
                'course' => $validatedData['course'],
                'date_published' => $validatedData['date_published'],
                'file' => $validatedData['file'],
                'main_topic' => $validatedData['main_topic'],
                'subtopic' => $validatedData['subtopic'],
                'key_terms' => $validatedData['key_terms'],
            ]);
            \Log::info(['status', $status]);

            if ($status) {
                return redirect()->back()->with('success', 'Paper updated succesfully.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'An error occurred while creating the paper.');
        }

    }
    public function store(Request $request)
    {

        \Log::info(['store log', $request->all()]);


        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'author' => 'required|string',
            'course' => 'required|string',
            'file' => 'nullable|mimes:pdf',
            'date_published' => ['required', 'string', new YearBelowCurrent()],
            'main_topic' => 'required|string',
            'subtopic' => 'required|string',
            'key_terms' => 'required|string',

        ]);

        if ($request->hasFile('file')) {
            $filepath = $request->file('file')->store('project/' . $validatedData['title'], 'public');
            $validatedData['file'] = $filepath;
            // $fullFilePath = storage_path('app/public/' . $filepath); // Get the full path

            // $output = shell_exec('python ' . base_path('storage/app/python/maincopy.py') . ' ' . escapeshellarg($fullFilePath) . ' 2>&1');
            // \Log::info(['debug start', $output]);



            // $output = shell_exec('python ' . base_path('storage/app/python/meta.py') . ' ' . escapeshellarg($fullFilePath));
            // \Log::info($output);
        }

        //comment this
        // return redirect('/papers-admin')->with(['success' => 'Paper added successfully.']);


        //uncomment this

        try {
            $status = Paper::create($validatedData);
            if ($status) {
                return redirect('/papers-admin')->with(['success' => 'Paper added successfully.']);
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
            if ($status) {
                return redirect('/papers-admin')->with('success', 'Paper deleted successfully');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while deleting the paper');
        }
    }

    public function upload(Request $request)
    {
        \Log::info('Request received', ['request' => $request->all()]);

        try {
            // Validate the uploaded file
            $validatedData = $request->validate([
                'file' => 'nullable|mimes:pdf',
            ]);
            \Log::info('Validation passed');

            $metadata = [];
            $result = [];

            if ($request->hasFile('file')) {
                \Log::info('File upload detected');

                // Store the uploaded file
                $filepath = $request->file('file')->store('preview/current', 'public');
                \Log::info('File stored', ['filepath' => $filepath]);

                $validatedData['file'] = $filepath;
                $fullFilePath = storage_path('app/public/' . $filepath);
                \Log::info('Full file path', ['fullFilePath' => $fullFilePath]);

                // Execute the Python script to extract metadata
                $commandMeta = 'python ' . base_path('storage/app/python/meta.py') . ' ' . escapeshellarg($fullFilePath);
                \Log::info('Executing Python metadata extraction', ['command' => $commandMeta]);

                $outputMeta = trim(shell_exec($commandMeta));
                \Log::info($outputMeta);

                // Decode the JSON output for metadata
                $metadata = json_decode($outputMeta, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    \Log::error('JSON decoding failed for metadata', [
                        'error' => json_last_error_msg(),
                        'raw_output' => $outputMeta,
                    ]);
                    $metadata = [];
                }

                // Execute the second Python script for maincopy
                $commandDebug = 'python ' . base_path('storage/app/python/maincopy.py') . ' ' . escapeshellarg($fullFilePath);
                \Log::info($commandDebug);
                $outputDebug = trim(shell_exec($commandDebug));
                \Log::info($outputDebug);


                // Decode the debug output
                $result = json_decode($outputDebug, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    \Log::error('JSON decoding failed for debug output', [
                        'error' => json_last_error_msg(),
                        'raw_output' => $outputDebug,
                    ]);
                    $result = [];
                }
            }

            // Merge metadata and result, ensuring no key conflicts
            $combinedResult = array_merge($metadata, $result);

            // Return the combined response
            return response()->json([
                'title' => $combinedResult['Title'] ?? 'Unknown Title',
                'abstract' => $combinedResult['Abstract'] ?? 'N/A',
                'author' => isset($combinedResult['Authors']) ? implode(', ', $combinedResult['Authors']) : 'Unknown Author',
                'course' => $combinedResult['Course'] ?? 'Unknown Course',
                'date_published' => $combinedResult['Year'] ?? 'Unknown Year',
                'file_path' => $validatedData['file'] ?? null,
                'main_topic' => $combinedResult['Main Topic'] ?? 'N/A',
                'subtopic' => $combinedResult['Subtopic'] ?? 'N/A',
                'key_terms' => isset($combinedResult['Key Terms']) ? implode(', ', $combinedResult['Key Terms']) : ['N/A'],
            ]);
        } catch (\Exception $e) {
            \Log::error('An error occurred in the upload function', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'An unexpected error occurred.'], 500);
        }
    }


}
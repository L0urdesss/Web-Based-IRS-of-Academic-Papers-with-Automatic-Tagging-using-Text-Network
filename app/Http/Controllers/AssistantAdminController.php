<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class AssistantAdminController extends Controller
{
    /**
     * Display a listing of assistant-admin users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function view(Request $request)
    {
        Log::debug('Fetching assistant-admin users.');
    
        $assistantAdmins = User::where('role', 'assistant-admin')->get();
    
        Log::debug('Assistant Admins retrieved: ', $assistantAdmins->toArray());
    
        return Inertia::render('Role/All', [
            'assistantAdmins' => $assistantAdmins,
        ]);
    }
    

    /**
     * Show the form to assign assistant-admin roles to users.
     *
     * @return \Inertia\Response
     */
    public function add()
    {
        Log::debug('Fetching users with role "user".');

        // Fetch all users with the 'user' role
        $users = User::where('role', 'user')->get();

        Log::debug('Users with role "user" retrieved: ', $users->toArray());

        return Inertia::render('Role/Add', [
            'users' => $users, // Pass users to the frontend
        ]);
    }

    /**
     * Assign the assistant-admin role to a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id', // Validate the user ID
            'role' => 'required|in:user,assistant-admin', // Ensure a valid role is provided
        ]);
    
        try {
            $user = User::findOrFail($request->id); // Fetch the user
            Log::debug('User found for role update:', ['user' => $user]);
    
            if ($user->role === $request->role) {
                Log::debug('User already has the selected role.', ['role' => $user->role]);
                return redirect()->back()->with('error', 'User already has the selected role.');
            }
    
            $user->role = $request->role; // Update the role
            $user->save(); // Save the change to the database
            Log::debug('User role updated successfully.', ['user' => $user]);
    
            return redirect()->route('assistant-admins.add')->with('success', 'User role updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating role:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to update user role.');
        }
    }
    
    

    /**
     * Show the form for editing the specified assistant-admin.
     *
     * @param  \App\Models\User  $user
     * @return \Inertia\Response
     */
    public function edit(User $user)
    {
        Log::debug('Editing assistant-admin: ', $user->toArray());

        // Ensure the user is an assistant-admin
        if ($user->role !== 'assistant-admin') {
            Log::warning('Attempted to edit a user who is not an assistant-admin: ', $user->toArray());
            return redirect()->route('assistant-admins.view')->with('error', 'You can only edit assistant-admin users.');
        }

        return Inertia::render('Role/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified assistant-admin in the database.
     *
     * @param  \App\Models\User  $user
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $userId)
    {
        $request->validate([
            'role' => 'required|in:user,assistant-admin', // Ensure a valid role is provided
        ]);
    
        try {
            $user = User::findOrFail($userId); // Find the user by ID
            Log::debug('User found for role update:', ['user' => $user]);
    
            if ($user->role === $request->role) {
                Log::debug('User already has the selected role.', ['role' => $user->role]);
                return redirect()->back()->with('error', 'User already has the selected role.');
            }
    
            $user->role = $request->role; // Update the role
            $user->save(); // Save the change to the database
            Log::debug('User role updated successfully.', ['user' => $user]);
    
            return redirect()->route('assistant-admins.add')->with('success', 'User role updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating role:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to update user role.');
        }
    }
    public function destroy(User $user)
    {
        try {
            // Ensure the user is currently an assistant-admin
            if ($user->role === 'assistant-admin') {
                $user->role = 'user'; // Update the role to "user"
                $user->save(); // Save the change
                Log::debug('User role updated to "user".', ['user' => $user]);

                return response()->json(['message' => 'User role updated to "user" successfully.']);
            } else {
                return response()->json(['error' => 'User is not an assistant-admin.'], 400);
            }
        } catch (\Exception $e) {
            Log::error('Error updating role:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to update user role.'], 500);
        }
    }
}
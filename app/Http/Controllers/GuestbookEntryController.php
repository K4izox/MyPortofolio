<?php

namespace App\Http\Controllers;

use App\Models\GuestbookEntry;
use Illuminate\Http\Request;

class GuestbookEntryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'message' => 'required|string|max:100',
        ]);

        try {
            GuestbookEntry::create($validated);
            return redirect()->back();
        } catch (\Throwable $e) {
            return redirect()->back()->withErrors(['message' => 'Error: ' . $e->getMessage()]);
        }
    }
}

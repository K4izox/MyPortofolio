<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            $message = ContactMessage::create($validated);
            
            // Replace with the owner's actual email or use env variable
            $adminEmail = env('MAIL_FROM_ADDRESS', 'reza06117@gmail.com');
            \Illuminate\Support\Facades\Mail::to($adminEmail)->send(new \App\Mail\ContactFormMail($message));
            
            return redirect()->back()->with('success', 'Message sent successfully!');
        } catch (\Throwable $e) {
            // Return JSON so it shows up exactly in the Inertia modal
            return response()->json([
                'error' => 'DEBUG ERROR: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
}

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

        $message = ContactMessage::create($validated);

        try {
            // Replace with the owner's actual email or use env variable
            $adminEmail = env('MAIL_FROM_ADDRESS', 'reza@example.com');
            \Illuminate\Support\Facades\Mail::to($adminEmail)->send(new \App\Mail\ContactFormMail($message));
        } catch (\Exception $e) {
            // Log error silently so user still sees success even if mail fails
            \Illuminate\Support\Facades\Log::error('Mail sending failed: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}

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
            
            try {
                // Set a shorter timeout for the mailer to prevent 60s max_execution_time fatal errors
                config(['mail.mailers.smtp.timeout' => 5]);
                
                // Send to the owner's email (MAIL_TO_ADDRESS)
                $adminEmail = env('MAIL_TO_ADDRESS', 'reza06117@gmail.com');
                \Illuminate\Support\Facades\Mail::to($adminEmail)->send(new \App\Mail\ContactFormMail($message));
            } catch (\Throwable $mailError) {
                // If email fails (e.g., Railway blocks SMTP), log it but don't fail the user request
                \Illuminate\Support\Facades\Log::error('Mail sending failed: ' . $mailError->getMessage());
                
                // Write to a public file so we can debug it without Railway Dashboard
                file_put_contents(public_path('mail-error.txt'), date('Y-m-d H:i:s') . " - " . $mailError->getMessage() . "\n", FILE_APPEND);
            }
            
            return redirect()->back()->with('success', 'Message sent successfully!');
        } catch (\Throwable $e) {
            // Return JSON so it shows up exactly in the Inertia modal if DB fails
            return response()->json([
                'error' => 'DEBUG ERROR: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
}

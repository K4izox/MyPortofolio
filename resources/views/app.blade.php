<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>Reza Fahlevi | 8-Bit Pixel Portfolio</title>
        <meta name="description" content="Tech enthusiast dengan minat mendalam di UI/UX Design, Full-Stack Development, dan Cybersecurity.">
        <meta property="og:title" content="Reza Fahlevi | 8-Bit Pixel Portfolio">
        <meta property="og:description" content="Tech enthusiast dengan minat mendalam di UI/UX Design, Full-Stack Development, dan Cybersecurity.">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ asset('profile.jpg') }}">
        <meta name="theme-color" content="#000000">
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <!-- Optional: Pixel art favicon could be linked here if it exists in public/ -->

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

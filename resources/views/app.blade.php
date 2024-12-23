<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'TupScholarly') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=roboto:100,400,500,700" rel="stylesheet" />

        <!-- Styles -->
        <style>
            /* Custom responsive styles */
            body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            @media (max-width: 768px) {
                body {
                    font-size: 14px; /* Adjust font size for smaller screens */
                }
            }
            @media (max-width: 480px) {
                body {
                    font-size: 12px; /* Adjust font size even more for very small screens */
                }
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-50">
        @inertia
    </body>
</html>

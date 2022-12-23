<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <link rel="icon" href="{{ url('favicon.ico') }}">

    <title>ERP | Enterprise Resource Planning</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
<div id="app"></div>
</body>
</html>
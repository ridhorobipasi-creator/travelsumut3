<?php

// Bootstrap Laravel application for Vercel serverless
define('LARAVEL_START', microtime(true));

// Composer autoloader
require __DIR__ . '/../vendor/autoload.php';

// Setup SQLite database directory for Vercel's /tmp
if (!file_exists('/tmp/database.sqlite')) {
    touch('/tmp/database.sqlite');
}

// Bootstrap the Laravel application
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Handle the request
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();

$kernel->terminate($request, $response);

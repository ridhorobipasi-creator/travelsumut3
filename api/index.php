<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Maintenance mode
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer autoloader
require __DIR__.'/../vendor/autoload.php';

// Setup SQLite database for Vercel Serverless environment
if (!is_dir('/tmp')) {
    mkdir('/tmp', 0777, true);
}
if (!file_exists('/tmp/database.sqlite')) {
    touch('/tmp/database.sqlite');
}

// Bootstrap Laravel and handle the request
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());

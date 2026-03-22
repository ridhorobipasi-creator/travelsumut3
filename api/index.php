<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Maintenance mode
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer autoloader
require __DIR__.'/../vendor/autoload.php';

// Setup Vercel-compatible /tmp directories since the rest of the filesystem is read-only.
$tmpDirs = [
    '/tmp/storage/logs',
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/bootstrap/cache'
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

// Setup SQLite database for Vercel Serverless environment
if (!file_exists('/tmp/database.sqlite')) {
    $localDb = __DIR__.'/../database/database.sqlite';
    if (file_exists($localDb)) {
        copy($localDb, '/tmp/database.sqlite');
    } else {
        touch('/tmp/database.sqlite');
    }
}

// Instruct Laravel to use the compiled views path in /tmp via env before it boots
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

// Bootstrap Laravel
$app = require_once __DIR__.'/../bootstrap/app.php';

// Override storage and bootstrap paths to /tmp so Laravel doesn't crash on read-only FS
$app->useStoragePath('/tmp/storage');
$app->useBootstrapPath('/tmp/bootstrap');

// Handle the request
$app->handleRequest(Request::capture());

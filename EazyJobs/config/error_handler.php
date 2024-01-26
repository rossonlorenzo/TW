<?php
$requestUri = $_SERVER['REQUEST_URI'];
$requestUri = strtok($requestUri, '?');
$baseDirectory = dirname(__DIR__);

$lastPart = substr($requestUri, strpos($requestUri, 'EazyJobs') + strlen('EazyJobs'));
$requestedFile = $baseDirectory . $lastPart;

if (!file_exists($requestedFile)) {
    // Handle 404 error
    header("Location: ./../Errore404.php");
    exit();
}
?>


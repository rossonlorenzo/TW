<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

$_SESSION = [];

session_destroy();

// Redirect to the login or homepage
header("Location: http://localhost/TW/EazyJobs/Home.php");
exit();
?>

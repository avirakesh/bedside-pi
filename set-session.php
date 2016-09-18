<?php 

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

if (session_status() == PHP_SESSION_NONE) {
	session_start();
}

if (!isset($_SESSION['start-time'])) {
	$_SESSION['start-time'] = time();
}

if (!isset($_SESSION['key'])) {
	$_SESSION['key'] = rand();
}

if (time() - $_SESSION['start-time'] > (2*60)) {
	$_SESSION['key'] = rand();
	$_SESSION['start-time'] = time();
}

// echo $_SESSION['start-time'] . '<br>' . $_SESSION['key'];
?>
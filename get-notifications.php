<?php

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

$key = file_get_contents('key.txt');

if ($key != $_GET['key']) {

	header('Content-Type: application/json');

	$array = json_decode(file_get_contents('notifications.json'));

	if (!isset($array)) {
		$array = array();
	}

	$final_array = array(
		'key' => $key,
		'items' => $array
		);

	echo json_encode($final_array, JSON_PRETTY_PRINT);
}
?>
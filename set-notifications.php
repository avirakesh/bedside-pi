<?php 

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

require 'set-session.php';

if (isset($_POST['package'])) {
	$array = json_decode(file_get_contents('notifications.json'), true);

	if (!isset($array)) {
		$array = array();
	}

	if (isset($_POST['image'])) {
		if (file_put_contents("images/".$_POST['package'].".png",base64_decode($_POST['image']))) {
			$array[] = array(
				'package' => $_POST['package'],
				'image' => true
				);

		} else {
			$array[] = array(
				'package' => $_POST['package'],
				'image' => false
				);	
		}

	} else {
		$array[] = array(
			'package' => $_POST['package'],
			'image' => false
			);
	}

	

	if (file_put_contents('notifications.json', json_encode($array)) && file_put_contents('key.txt', rand())) {
		$result_array = array('result' => 1);
	} else {
		$result_array = array('result' => 0);
	}

	header('Content-Type: application/json');
	echo (json_encode($result_array));
}
?>
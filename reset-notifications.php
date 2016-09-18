<?php

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

if (file_put_contents('notifications.json', json_encode(array())) && file_put_contents('key.txt', rand())) {
	header('Content-Type: application/json');
	echo json_encode("cleared", JSON_PRETTY_PRINT);
}

?>
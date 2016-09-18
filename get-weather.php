<?php 

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

$latlng = "43.077739,-89.418135"; /* Lat, Lng */
$apiKey = /* Your API Key Here */;

/* To obtain an API Key register at "https://developer.forecast.io/" */

$url = "https://api.forecast.io/forecast/" . $apiKey . "/" . $latlng . "?units=si";

$input_json = json_decode(file_get_contents($url), true);

$curr = $input_json['currently'];

$json = array(
	'summary' => $curr['summary'],
	'icon' => $curr['icon'],
	'precipProbability' => $curr['precipProbability'],
	'temp' => $curr['temperature'],
	'appTemp' => $curr['apparentTemperature']
);
header('Content-Type: application/json');
echo json_encode($json, JSON_PRETTY_PRINT);

?>
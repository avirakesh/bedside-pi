/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

var latlng = '65.077739,-21.418135'; /* latitude, longitude */
var apiKey = 'Your API Key here' ; 

/* To obtain an API key, sign up at 
------------------------
https://darksky.net/dev/
------------------------ 
*/
var siUnits = true; /* change to false for imperial units */


// Exporting the values for use
module.exports.latlng = latlng;
module.exports.apiKey = apiKey;
module.exports.siUnits = siUnits;


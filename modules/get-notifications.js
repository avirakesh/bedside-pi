/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

var fs = require ('fs');
module.exports = {};
module.exports.getNotifications = function (res, io) {
	fs.readFile('./notifications.json', 'utf8', function (err, data) {
		// console.log(data);
		if (!err) {
			res.set('Content-Type', 'application/json');
			res.send(data);
			// console.log('Sent!');
		} else {
			res.status(400).send("Could not read 'notifications.json'");
			// console.log('Failed!')
		}
	});
}
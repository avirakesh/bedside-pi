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
module.exports.clearNotifications = function(res, io) {
	fs.writeFile('./notifications.json', '[]', function (err){
		// console.log ('notifications.json > []');
		io.emit('update_notifs');
		res.status(200).send('Success');	
	});

}

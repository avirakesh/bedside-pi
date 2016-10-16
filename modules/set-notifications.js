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

 module.exports.setNotifications = function (body, res, io) {

 	var notifications = JSON.parse(body.notifications);

 	var write = new Array();
 	var index = 0;
 	
 	notifications.forEach(function(notification) {
 		write[index] = {};
 		write[index].package = notification['package'];
 		write[index].image = notification['image'];

 		fs.writeFile('./assets/images/' + notification['package'] + '.png', notification['imageString'], 'base64'); 
 		
 		index = index + 1;
 	});

 	fs.writeFile('./notifications.json', JSON.stringify(write, null, 2), function(err) {
 		io.emit('update_notifs');
 		res.status(200).send('Success');
 	});

 }

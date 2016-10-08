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
	fs.writeFile('./assets/images/' + body.package + '.png', body.image, 'base64');

	// console.log(body.package);

	var obj = JSON.parse(fs.readFileSync('./notifications.json', 'utf8'));
	index = obj.length;

	obj[index] = {};

	obj[index].package = body.package;
	obj[index].image = true;

	fs.writeFile('./notifications.json', JSON.stringify(obj, null, 2), function(err) {
		// console.log ('notifications.json > ' + obj[index])

		io.emit('update_notifs');
		res.status(200).send('Success');
	});	
}
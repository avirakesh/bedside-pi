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
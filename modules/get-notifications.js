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
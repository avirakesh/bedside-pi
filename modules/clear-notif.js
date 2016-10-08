var fs = require ('fs');
module.exports = {};
module.exports.clearNotifications = function(res, io) {
	fs.writeFile('./notifications.json', '[]', function (err){
		// console.log ('notifications.json > []');
		io.emit('update_notifs');
		res.status(200).send('Success');	
	});

}

const Sequelize = require('sequelize');
const db = require('..');

const Campuses = db.define('campuses', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: 'https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2017/06/21180000/planet-10-orange-blue-final-small-800x533.jpg'
	}
});

module.exports = Campuses;

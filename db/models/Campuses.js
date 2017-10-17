const Sequelize = require('sequelize');
const db = require('..');

const Campuses = db.define('campuses', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: 'https://thetomatos.com/wp-content/uploads/2017/04/free-school-building-clipart.png'
	}
});

module.exports = Campuses;

const Sequelize = require('sequelize');
const db = require('..');

const Students = db.define('students', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.STRING
	}
});

module.exports = Students;

const Sequelize = require('sequelize');
const db = require('..');

const Campuses = db.define('campuses', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: 'http://www.eua.be/Libraries/euima-full-costing/PIC-2-Front-of-College_-_TCD.jpg?sfvrsn=0'
	}
});

module.exports = Campuses;

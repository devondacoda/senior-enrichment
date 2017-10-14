'use strict';
const Sequelize = require('sequelize');
const db = require('..');
// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is required everywhere

// This is also probably a good place for you to set up your associations
const Students = db.define('students', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING
	}
});

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

Campuses.belongsToMany(Students, {through: 'campus-student'});

module.exports = {Students, Campuses};

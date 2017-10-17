'use strict';
const api = require('express').Router();
const Students = require('../db/models').Students;
const Campuses = require('../db/models').Campuses;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}));

api.get('/campuses', (req, res, next) => {
	Campuses.findAll()
	.then(campuses => {
		res.json(campuses);
	})
	.catch(next);
});

api.post('/campuses', (req, res, next) => {
	Campuses.create(req.body)
	.then((campus) => {
		res.json(campus);
	})
	.catch(next);
});

api.get('/campuses/:campusId', (req, res, next) => {
	const selectedCampus = Campuses.findById(Number(req.params.campusId));
	const campusStudents = selectedCampus.then(campus => {
		return Students.findAll({
			where: {
				campusId: campus.id
			}
		});
	});

	Promise.all([selectedCampus, campusStudents])
	.then((arrOfResults) => res.json(arrOfResults))
	.catch(next);
});

api.get('/students', (req, res, next) => {
	Students.findAll()
	.then(students => {
		res.json(students);
	})
	.catch(next);
});

api.post('/students', (req, res, next) => {
	Students.create(req.body)
	.then((student) => {
		res.json(student);
	})
	.catch(next);
});

api.get('/students/:studentId', (req, res, next) => {
	Students.findById(Number(req.params.studentId), {
		include: [{all: true}]
	})
	.then(student => res.json(student))
	.catch(next);
});

module.exports = api;

'use strict';
const api = require('express').Router();
const Students = require('../db/models').Students;
const Campuses = require('../db/models').Campuses;

api.route('/')
  .get((req, res, next) => {
    Students.findAll()
    .then(students => {
      res.json(students);
    })
    .catch(next);
  })

  .post((req, res, next) => {
    Students.create(req.body)
    .then((student) => res.json(student))
    .catch(next);
  });

api.route('/:studentId')
  .get((req, res, next) => {
    Students.findById(Number(req.params.studentId), {
      include: [{all: true}]
    })
    .then(student => res.json(student))
    .catch(next);
  })

  .delete((req, res, next) => {
    Students.destroy({
      where: {
        id: Number(req.params.studentId)
      }
    })
    .then(() => res.sendStatus(200))
    .catch(next);
  })

  .put((req, res, next) => {
    const {campus} = req.body;
    let campusId = null;
    Campuses.findOne({
      where: {
        name: campus
      }
    })
    .then(foundCampus => {
      return foundCampus ? foundCampus.id : 0; // if campus input from form left empty, this will return a falsy value e.g. 0;
    })
    .then(_campusId => {
      campusId = _campusId;
      return Students.findById(Number(req.params.studentId));
    })
    .then(student => {
      student.update({
        name: req.body.name || student.name,
        email: req.body.email || student.email,
        campusId: campusId || student.campusId
      });
    })
    .then(() => res.sendStatus(200))
    .catch(next);
  });

api.put('/removeCampus/:studentId', (req, res, next) => {
  const id = Number(req.params.studentId);
  Students.findById(id)
  .then(student => student.update({campusId: null}))
  .then(() => res.sendStatus(200))
  .catch(next);
});
module.exports = api;

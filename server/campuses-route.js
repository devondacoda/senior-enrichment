const api = require('express').Router();
const Students = require('../db/models').Students;
const Campuses = require('../db/models').Campuses;

api.route('/')
  .get((req, res, next) => {
    Campuses.findAll()
    .then(campuses => {
      res.json(campuses);
    })
    .catch(next);
  })
  .post((req, res, next) => {
    Campuses.create(req.body)
    .then(campus => res.json(campus))
    .catch(next);
  });

api.route('/:campusId')
  .get((req, res, next) => {
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
  })

  .delete((req, res, next) => {
    Campuses.destroy({
      where: {
        id: Number(req.params.campusId)
      }
    })
    .then(() => res.sendStatus(200))
    .catch(next);
  })

  .put((req, res, next) => {
    const {name, image, campusId, students} = req.body;
    Campuses.findById(Number(campusId))
    .then(campus => {
      return campus.update({
        name: name || campus.name,
        image: image || campus.image
      });
    })
    .then(() => {
      return students.map(student => {
        Students.update({campusId}, {
          where: {
            name: student
          }
        });
      });
    })
    .then(() => res.sendStatus(200))
    .catch(next);
  });

module.exports = api;

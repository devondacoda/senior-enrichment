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
    const selectedCampus = Campuses.findById(Number(req.params.campusId))
    .then(campus => {
      return campus.update({
        name: name || campus.name,
        image: image || campus.image
      });
    });
    const studentsArr = students.map(student => {
      return Students.findOne({
        where: {
          name: student
        }
      });
    });

    Promise.all([selectedCampus, studentsArr])
    .then((promisesArr) => {
      return promisesArr[1].map(student => {
        return student.update({campusId});
      });
    })
    .then(() => res.json('done'))
    .catch(next);
  });

module.exports = api;

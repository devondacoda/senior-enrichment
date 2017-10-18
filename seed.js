const faker = require('faker');
const toonAvatar = require('cartoon-avatar');
const Students = require('./db/models').Students;
const Campuses = require('./db/models').Campuses;
const db = require('./db');

db.sync({ force: true })
.then(() => {
  for (let i = 0; i < 20; i++) {
    const randomNumber = Math.round(Math.random() * 10);
    const gender = randomNumber > 5 ? 'female' : 'male';
    Students.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      image: toonAvatar.generate_avatar({ gender: gender })
    });

    Campuses.create({
      name: `${faker.hacker.adjective().toUpperCase()} ${faker.company.bsBuzz().toUpperCase()} SCHOOL`,
    });
  }
})
.then(() => console.log('database seeded successfully'))
.catch(() => console.log('could not seed database'));

const db = require('../server/db');
const { User, Trail } = require('../server/db/models');

const users = [
  {
    name: 'hansel gretel',
    email: 'hansel@hansel.com',
    password: 'hansel',
    isAdmin: true,
    userId: 1
  },
  {
    name: 'panda manda',
    email: 'panda@panda.com',
    password: 'panda',
    isAdmin: false,
    userId: 2
  },
  {
    name: 'a a',
    email: 'a@a.com',
    password: 'a',
    isAdmin: true,
    userId: 3
  }
];

const trails = [{
  description: "11th Floor Python",
  breadcrumbs :  [{
    "accuracy": "65",
    "altitude": "9.025277137756348",
    "altitudeAccuracy": "10",
    "heading": "-1",
    "latitude": "40.705019108357114",
    "longitude": "-74.00913176281047",
    "speed": "-1"
  }],
  userId: 1
}];

const seed = () =>
Promise.all(users.map(user =>
  User.create(user))
)
.then(() =>
Promise.all(trails.map(trail =>
  Trail.create(trail))
)
);

const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

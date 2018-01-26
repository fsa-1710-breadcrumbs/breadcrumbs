const db = require('../server/db');
const { User, Trail } = require('../server/db/models');

// const id = () => Math.floor((Math.random() * users.length) + 1);

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
  }
];

const trails = [{
  description: "firstBreadcrumb",
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

// const seed = () =>
//   Promise.all(users.map(user => User.create(user))
//   )
//   .then(()=>
//   Promise.all(trail.map(crumb => Trail.create(crumb)))
//   )
// );

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

// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */
// const db = require('../server/db');
// const { User, Trail } = require('../server/db/models');

// async function seed() {
//   await db.sync({ force: true });
//   console.log('db synced!');
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({ email: 'cody@email.com', password: '123', user_name: 'pone-age' }),
//     User.create({ email: 'murphy@email.com', password: '123', user_name: 'p-diddy'}),
//     User.create({ email: 'dude@email.com', password: 'dude', user_name: 'p-daddy-pint-size' }),
//     User.create({ email: 'heyo@email.com', password: 'heyo', user_name: 'p-dawg00' }),
//   ]);

//   const memories = await Memory.bulkCreate([
//     {
//       title: 'memory at a/a',
//       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//       lng: -73.98392230000002,
//       lat: 40.75135969999999,
//       authorId: 3,
//     },
//     {
//       title: 'memory alta restaurant',
//       text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
//       lng: -73.99820009999996,
//       lat: 40.7344108,
//       authorId: 1,
//     },
//     {
//       title: 'memory happy empire state building',
//       text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
//       lng: -73.98575770000002,
//       lat: 40.7485413,
//       authorId: 4,
//     },
//     {
//       title: 'memory cool harlem',
//       text: 'an cool harlem memory',
//       lng: -73.9464769,
//       lat: 40.81155039999999,
//       authorId: 2,
//     },
//     {
//       title: 'memory angry central park',
//       text: 'a angry memory',
//       lng: -73.96535510000001,
//       lat: 40.7828647,
//       authorId: 2,
//     },
//     {
//       title: 'memory interesting hoboken',
//       text: 'an interesting memory',
//       lng: -74.0323626,
//       lat: 40.7439905,
//       authorId: 2,
//     },
//     {
//       title: 'memory dark fullstack',
//       text: 'a dark memory',
//       lng: -74.00916000000001,
//       lat: 40.705076,
//       authorId: 1,
//     },
//     {
//       title: 'memory creepy charging bull',
//       text: 'a creepy memory',
//       lng: -74.01344360000002,
//       lat: 40.7055537,
//       authorId: 1,
//     },
//     {
//       title: 'memory stoked brooklyn bridge',
//       text: 'a memory I am stoked about',
//       lng: -73.99686429999997,
//       lat: 40.7060855,
//       authorId: 3,
//     },
//     {
//       title: 'memory excited champs diner',
//       text: 'an exciting memory',
//       lng: -73.9409005,
//       lat: 40.7084401,
//       authorId: 3,
//     },
//   ]);
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded ${memories.length} memories`);
//   console.log('seeded successfully');
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch((err) => {
//     console.error(err.message);
//     console.error(err.stack);
//     process.exitCode = 1;
//   })
//   .then(() => {
//     console.log('closing db connection');
//     db.close();
//     console.log('db connection closed');
//   });

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...');

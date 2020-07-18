const _ = require('lodash');

// lodash
const num = _.random(0, 20);
console.log('number: ', num);

const greet = _.once(() => {
  console.log('hello');
});

greet();
greet();
greet();

const app = require('../../app');

before(async function() {
  this.timeout(1000000);
  this.app = await app;
});
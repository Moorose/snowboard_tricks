const app = require('../../app');

before(async () => {
  this.timeout(1000000);
  this.app = await app;
});

"use strict";

const Koa = require("koa");
const koaBody = require("koa-body");
const bunyan = require("bunyan");
const koaLogger = require("koa-bunyan");

const httpConf = require("./src/middlewares/httpConf");
const logger = require("./src/middlewares/logger");
const router = require("./src/router");
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 3000;

const app = new Koa();

const runServer = async function() {
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync({ force: true });
  } else {
    await sequelize.sync();
  }

  app.use(koaBody());
  app.use(koaLogger(logger));
  app.use(httpConf.setCORS);
  // app.use(httpConf.setContentType);
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app.listen(PORT, () => {
    console.log(`Server start http://localhost:${PORT}`);
  });
};

const server = runServer();

module.exports = server;

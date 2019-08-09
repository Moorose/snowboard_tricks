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

if (process.env.NODE_ENV === "test") {
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Database FORCE synchronized successfully');
    }).catch((err) => {
      console.log('Database wasn`t synchronized: ', err);
    });
} else {
  sequelize.sync().then((result) => {
    console.log('Database FORCE synchronized successfully');
  }).catch((err) => {
    console.log('Database wasn`t synchronized: ', err);
  });
}

// app.use(
//   session({
//     store: new SequelizeSessionStore(sequelize, {
//       tableName: "sessions",
//     }),
//   }),
// );

app.use(koaBody());
app.use(koaLogger(logger));
app.use(httpConf.setCORS);
app.use(httpConf.setContentType);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`);
});

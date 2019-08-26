'use strict';
const Sequelize = require('sequelize');

exports.setResult = async (ctx, result, status) => {
  if (result) {
    ctx.response.body = result;
  }
  if (status) {
    ctx.status = status;
  }
};

exports.errorHandler = async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      err.status = 409;
    }
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
};

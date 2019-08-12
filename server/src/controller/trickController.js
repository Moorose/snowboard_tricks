"use strict";
const trickService = require("../service/trickService");

exports.getTrickList = async ctx => {
  try {
    const result = await trickService.getTrickList();
    ctx.response.body = JSON.stringify(result);
    ctx.response.set("Content-Type", "application/json");
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

exports.postTrick = async ctx => {
  try {
    const result = await trickService.addTrick({ ...ctx.request.body });
    ctx.response.body = JSON.stringify(result);
    ctx.response.set("Content-Type", "application/json");
    ctx.status = 201;
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

exports.getTrickById = async ctx => {
  try {
    const result = await trickService.getTrickById(ctx.params.id);
    ctx.response.body = JSON.stringify(result);
    ctx.response.set("Content-Type", "application/json");
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

exports.deleteTrickById = async ctx => {
  try {
    const result = await trickService.destroyTrickById(ctx.params.id);
    ctx.response.body = JSON.stringify(result);
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

exports.deleteAllTrick = async ctx => {
  try {
    const result = await trickService.destroyAllTrick();
    ctx.response.body = JSON.stringify(result);
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

"use strict";
const trickService = require("../service/trickService");
const resultSetter = require("../middlewares/resultSetter");

exports.getTrickList = async ctx => {
  const result = await trickService.getTrickList();
  resultSetter.setResult(ctx, result);
};

exports.createTrick = async ctx => {
  const result = await trickService.createTrick({ ...ctx.request.body });
  resultSetter.setResult(ctx, result, 201);
};

exports.updateTrick = async ctx => {
  const put = await trickService.updateTrick({ ...ctx.request.body });
  if (put[0] === 1) {
    resultSetter.setResult(ctx, null, 204);
  } else {
    ctx.throw(404);
  }
};

exports.getTrickById = async ctx => {
  const result = await trickService.getTrickById(ctx.params.id);
  if (result === null) {
    ctx.throw(404);
  } else {
    resultSetter.setResult(ctx, result);
  }
};

exports.deleteTrickById = async ctx => {
  const result = await trickService.destroyTrickById(ctx.params.id);
  if (result === 0) {
    ctx.throw(404);
  } else {
    resultSetter.setResult(ctx, null, 204);
  }
};

exports.deleteAllTricks = async ctx => {
  const result = await trickService.destroyAllTricks();
  if (result === 0) {
    ctx.throw(404);
  } else {
    resultSetter.setResult(ctx, null, 204);
  }
};

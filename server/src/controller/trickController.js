"use strict";
const trickService = require("../service/trickService");
const resultSetter = require("../middlewares/resultSetter");

exports.getTrickList = async ctx => {
  const trickList = await trickService.getTrickList();
  resultSetter.setResult(ctx, trickList);
};

<<<<<<< HEAD
exports.createTrick = async ctx => {
  const newTrick = await trickService.createTrick({ ...ctx.request.body });
  resultSetter.setResult(ctx, newTrick, 201);
};

exports.updateTrick = async ctx => {
  const updateCount = await trickService.updateTrick({ ...ctx.request.body });
  if (updateCount[0] === 1) {
    resultSetter.setResult(ctx, null, 204);
  } else {
    ctx.throw(404);
=======
exports.postTrick = async ctx => {
  try {
    const result = await trickService.addTrick({ ...ctx.request.body });
    ctx.response.body = JSON.stringify(result);
    ctx.response.set("Content-Type", "application/json");
    ctx.status = 201;
  } catch (err) {
    if (err.parent.code == '23505') {
      ctx.status = 409;
      ctx.body = `Internal error: ${err.parent.detail}`;
    }else {
      ctx.status = 500;
      ctx.body = `Internal error: ${err}`;
    }
  }
};

exports.putTrick = async ctx => {
  try {
    const put = await trickService.updateTrick({ ...ctx.request.body });
    console.dir(put);
    if( put[0] == 1 ) {
      const result = await trickService.getTrickById(ctx.request.body.id);
      ctx.response.body = JSON.stringify(result);
      ctx.response.set("Content-Type", "application/json");
      ctx.status = 200;
    }else {
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  } catch (err) {
    if (err.parent.code == '23505') {
      ctx.status = 409;
      ctx.body = `Internal error: ${err.parent.detail}`;
    }else {
      ctx.status = 500;
      ctx.body = `Internal error: ${err}`;
    }
>>>>>>> 49d3b2a24d274ee1a56e423e2627b91b9a873135
  }
};

exports.getTrickById = async ctx => {
<<<<<<< HEAD
  const updateTrick = await trickService.getTrickById(ctx.params.id);
  if (updateTrick === null) {
    ctx.throw(404);
  } else {
    resultSetter.setResult(ctx, updateTrick);
=======
  try {
    const result = await trickService.getTrickById(ctx.params.id);
    if (result == null) {
      ctx.status = 404;
      ctx.body = 'Not Found';
    } else {
      ctx.response.body = JSON.stringify(result);
      ctx.response.set("Content-Type", "application/json");
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
>>>>>>> 49d3b2a24d274ee1a56e423e2627b91b9a873135
  }
};

exports.deleteTrickById = async ctx => {
  const deletedCount = await trickService.destroyTrickById(ctx.params.id);
  if (deletedCount) {
    resultSetter.setResult(ctx, null, 204);
  } else {
    ctx.throw(404);
  }
};

exports.deleteAllTricks = async ctx => {
  const deletedCount = await trickService.destroyAllTricks();
  resultSetter.setResult(ctx, null, 204);
};

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
  }
};

exports.getTrickById = async ctx => {
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
  }
};

exports.deleteTrickById = async ctx => {
  try {
    const result = await trickService.destroyTrickById(ctx.params.id);
    if (result == 0){
      ctx.status = 404;
      ctx.body = 'Not Found';
    }else {
      ctx.response.body = JSON.stringify(result);
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

exports.deleteAllTrick = async ctx => {
  try {
    const result = await trickService.destroyAllTrick();
    if (result == 0){
      ctx.status = 404;
      ctx.body = 'Not Found';
    }else {
      ctx.response.body = JSON.stringify(result);
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Internal error: ${err}`;
  }
};

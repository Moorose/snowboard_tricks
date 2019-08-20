"use strict";
const trickService = require("../service/trickService");
const resultSetter = require("../middlewares/resultSetter");

exports.getTrickList = async ctx => {
    const trickList = await trickService.getTrickList();
    resultSetter.setResult(ctx, trickList);
};

exports.createTrick = async ctx => {
    const newTrick = await trickService.createTrick({...ctx.request.body});
    resultSetter.setResult(ctx, newTrick, 201);
};

exports.updateTrick = async ctx => {
    const updateCount = await trickService.updateTrick({...ctx.request.body});
    if (updateCount[0] === 1) {
        resultSetter.setResult(ctx, null, 204);
    } else {
        ctx.throw(404);
    }
};

exports.getTrickById = async ctx => {
    const updateTrick = await trickService.getTrickById(ctx.params.id);
    if (updateTrick === null) {
        ctx.throw(404);
    } else {
        resultSetter.setResult(ctx, updateTrick);
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
    await trickService.destroyAllTricks();
    resultSetter.setResult(ctx, null, 204);
};

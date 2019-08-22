"use strict";
const gradeService = require("../service/gradeService");
const resultSetter = require("../middlewares/resultSetter");

exports.joinTrickToUser = async ctx => {
    const grade = await gradeService.joinTrickToUser({...ctx.params});
    await resultSetter.setResult(ctx, grade, 201);
};

exports.unJoinTrickToUser = async ctx => {
    const grade = await gradeService.unJoinTrickToUser({...ctx.params});
    await resultSetter.setResult(ctx, null, 204);
};

exports.markTrick = async ctx => {
    const grade = await gradeService.markTrick({...ctx.request.body, ...ctx.params});
    await resultSetter.setResult(ctx, grade, 201);
};

exports.getUserListByTrickId = async ctx => {
    const userList = await gradeService.getUserListByTrickId(ctx.params.trickId);
    await resultSetter.setResult(ctx, userList);
};

exports.getTrickListByUserId = async ctx => {
    const trickList = await gradeService.getTrickListByUserId(ctx.params.userId);
    await resultSetter.setResult(ctx, trickList);
};

exports.getUserLevelById = async ctx => {
    const level = await gradeService.getUserLevel(ctx.params.userId);
    await resultSetter.setResult(ctx, level);
};

"use strict";
const gradeService = require("../service/gradeService");
const resultSetter = require("../middlewares/resultSetter");
const sessionService = require("../middlewares/checkUser");

exports.joinTrickToUser = async ctx => {
    const userId = await sessionService.isUser(1);
    await gradeService.joinTrickToUser(userId, ctx.params.id);
};

exports.unJoinTrickToUser = async ctx => {
    const userId = await sessionService.isUser(1);
    await gradeService.unJoinTrickToUser(userId, ctx.params.id);
};

exports.markTrickAsDone = async ctx => {
    const userId = await sessionService.isUser(1);
    await gradeService.markTrickAsDone(userId, ctx.params.id);
};

exports.unmarkTrickAsDone = async ctx => {
    const userId = await sessionService.isUser(1);
    await gradeService.unmarkTrickAsDone(userId, ctx.params.id);
};

exports.getUserListByTrickId = async ctx => {
    await sessionService.isUser(1);
    const userList = await gradeService.getUserListByTrickId(ctx.params.id);
    await resultSetter.setResult(ctx, userList);
};

exports.getTrickListByUserId = async ctx => {
    const userId = await sessionService.isUser(1);
    const trickList = await gradeService.getTrickListByUserId(userId);
    await resultSetter.setResult(ctx, trickList);
};

// exports.getTrickListByUserId = async (userId) => {

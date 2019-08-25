"use strict";
const userService = require("../service/userService");
const userTrickService = require("../service/userTrickService");
const resultSetter = require("../middlewares/resultSetter");

exports.getUserById = async ctx => {
    const updateUser = await userService.getUserById(ctx.params.id);
    if (updateUser === null) {
        ctx.throw(404);
    } else {
        await resultSetter.setResult(ctx, updateUser);
    }
};

exports.getUserList = async ctx => {
    const UserList = await userService.getUserList();
    await resultSetter.setResult(ctx, UserList);
};

exports.createUser = async ctx => {
    const newUser = await userService.createUser({...ctx.request.body});
    await resultSetter.setResult(ctx, newUser, 201);
};

exports.updateUser = async ctx => {
    const [updateCount] = await userService.updateUser({...ctx.request.body});
    if (updateCount === 1) {
        await resultSetter.setResult(ctx, null, 204);
    } else {
        ctx.throw(404);
    }
};

exports.deleteUserById = async ctx => {
    const deletedCount = await userService.destroyUserById(ctx.params.id);
    if (deletedCount) {
        await resultSetter.setResult(ctx, null, 204);
    } else {
        ctx.throw(404);
    }
};

exports.joinTrickToUser = async ctx => {
    const userTrickRow = await userTrickService.joinTrickToUser({...ctx.params});
    await resultSetter.setResult(ctx, userTrickRow, 201);
};

exports.unJoinTrickToUser = async ctx => {
    await userTrickService.unJoinTrickToUser({...ctx.params});
    await resultSetter.setResult(ctx, null, 204);
};

exports.markTrick = async ctx => {
    const userTrickRow = await userTrickService.markTrick({...ctx.request.body, ...ctx.params});
    await resultSetter.setResult(ctx, userTrickRow, 201);
};


exports.getTrickListByUserId = async ctx => {
    const trickList = await userTrickService.getTrickListByUserId(ctx.params.userId);
    await resultSetter.setResult(ctx, trickList);
};

exports.getUserLevelById = async ctx => {
    const level = await userTrickService.getUserLevel(ctx.params.userId);
    await resultSetter.setResult(ctx, level);
};

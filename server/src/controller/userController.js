"use strict";
const userService = require("../service/userService");
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

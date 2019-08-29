
const trickService = require('../service/trickService');
const resultSetter = require('../middlewares/resultSetter');
const userTrickService = require('../service/userTrickService');

exports.getTrickList = async (ctx) => {
  const trickList = await trickService.getTrickList();
  await resultSetter.setResult(ctx, trickList);
};

exports.createTrick = async (ctx) => {
  const newTrick = await trickService.createTrick({ ...ctx.request.body });
  await resultSetter.setResult(ctx, newTrick, 201);
};

exports.updateTrick = async (ctx) => {
  const [updateCount] = await trickService.updateTrick({ ...ctx.params, ...ctx.request.body });
  if (updateCount === 1) {
    await resultSetter.setResult(ctx, null, 204);
  } else {
    ctx.throw(404);
  }
};

exports.getTrickById = async (ctx) => {
  const trick = await trickService.getTrickById(ctx.params.id);
  if (trick === null) {
    ctx.throw(404);
  } else {
    await resultSetter.setResult(ctx, trick);
  }
};

exports.deleteTrickById = async (ctx) => {
  const deletedCount = await trickService.destroyTrickById(ctx.params.id);
  if (deletedCount) {
    await resultSetter.setResult(ctx, null, 204);
  } else {
    ctx.throw(404);
  }
};

exports.deleteAllTricks = async (ctx) => {
  await trickService.destroyAllTricks();
  await resultSetter.setResult(ctx, null, 204);
};

exports.getUserListByTrickId = async (ctx) => {
  const userList = await userTrickService.getUserListByTrickId(ctx.params.trickId);
  await resultSetter.setResult(ctx, userList);
};

exports.getUserTrick = async (ctx) => {
  const userTrick = await userTrickService.getUserTrick({ ...ctx.params });
  if (userTrick) {
    await resultSetter.setResult(ctx, userTrick, 200);
  } else {
    ctx.throw(404);
  }
};

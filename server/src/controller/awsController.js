const awsService = require('../service/awsService');
const resultSetter = require('../middlewares/resultSetter');

exports.checkBucket = async (ctx) => {
  await awsService.checkBucket();
  await resultSetter.setResult(ctx, null, 200);
};

exports.checkFile = async (ctx) => {
  const file = await awsService.checkFile({ ...ctx.params });
  await resultSetter.setResult(ctx, file, 200);
};

exports.getSignedUrlForPut = async (ctx) => {
  const link = await awsService.getSignedUrlForPut({ ...ctx.params });
  const url = {
    key: ctx.params.fileName,
    link,
  };
  await resultSetter.setResult(ctx, url, 200);
};

exports.getSignedUrlForGet = async (ctx) => {
  const link = await awsService.getSignedUrlForGet({ ...ctx.params });
  const url = {
    key: ctx.params.fileName,
    link,
  };
  await resultSetter.setResult(ctx, url, 200);
};

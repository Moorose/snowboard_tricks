exports.setCORS = async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  ctx.response.set('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  ctx.response.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.response.set('Access-Control-Allow-Credentials', 'true');
  await next();
};

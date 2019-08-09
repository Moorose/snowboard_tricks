exports.setCORS = async (ctx, next) => {
    ctx.response.set("Access-Control-Allow-Origin", "*");
    ctx.response.set("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    ctx.response.set("Access-Control-Allow-Headers", "Content-Type");
    await next();
};

exports.setContentType = async (ctx, next) => {
    ctx.response.set('Content-Type', 'application/json');
    await next();
};
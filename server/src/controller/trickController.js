'use strict';

const trickService = require('../service/trickService');

exports.getTrickList = async (ctx) => {
    try {
        const result = await trickService.getTrickList();
        ctx.response.body = JSON.stringify(result);
    } catch (err) {
        ctx.status = 500;
        ctx.body = `Internal error: ${err}`;
    }
};


exports.postTrick = async (ctx) => {
    try {
        const result = await trickService.addTrick({...ctx.request.body});
        ctx.response.body = JSON.stringify(result);
    } catch (err) {
        ctx.status = 500;
        ctx.body = `Internal error: ${err}`;
    }
};


// router.get('/user/:id', async (ctx) => {
//     try {
//         const result = await userService.getUserById(ctx.params.id);
//         ctx.response.body = JSON.stringify(result);
//     } catch (err) {
//         ctx.status = 500;
//         ctx.body = `Internal error: ${err}`;
//     }
// });

// router.delete('/user/:id', async (ctx) => {
//     try {
//         if (isNaN(Number(ctx.params.id))) {
//             ctx.throw(400, 'Invalid id');
//         }
//         const result = await userService.destroyUserById(ctx.params.id);
//         ctx.response.body = JSON.stringify(result);
//     } catch (err) {
//         ctx.status = 500;
//         ctx.body = `Internal error: ${err}`;
//     }
// });

// router.delete('/user', async (ctx) => {
//     try {
//         const result = await userService.destroyAllUser();
//         ctx.response.body = JSON.stringify(result);
//     } catch (err) {
//         ctx.status = 500;
//         ctx.body = `Internal error: ${err}`;
//     }
// });

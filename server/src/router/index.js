const Router = require('koa-router');
const trickController = require("../controller/trickController");
const router = new Router();

router
    .get('/tricks',trickController.getTrickList)
    .get('/tricks/:id', trickController.getTrickById)
    .post('/tricks', trickController.postTrick)
    .delete('/tricks/:id', trickController.deleteTrickById)
    .delete('/tricks', trickController.deleteAllTrick);

module.exports = router;

const Router = require('koa-router');
const trickController = require("../controller/trickController");
const router = new Router();

router
    .get('/tricks',trickController.getTrickList)
    .get('/tricks/:id', trickController.getTrickById)
    .patch('/tricks/:id', trickController.updateTrick)
    .post('/tricks', trickController.createTrick)
    .delete('/tricks/:id', trickController.deleteTrickById)
    .delete('/tricks', trickController.deleteAllTricks);

module.exports = router;

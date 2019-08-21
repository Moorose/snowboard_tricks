const Router = require('koa-router');
const trickController = require("../controller/trickController");
const userController = require("../controller/userController");
const router = new Router();

router
    .get('/user', userController.getUserList)
    .get('/user/:id', userController.getUserById)
    .post('/user', userController.createUser)
    .patch('/user', userController.updateUser)
    .delete('/user/:id', userController.deleteUserById)
    .get('/tricks',trickController.getTrickList)
    .get('/tricks/:id', trickController.getTrickById)
    .patch('/tricks/:id', trickController.updateTrick)
    .post('/tricks', trickController.createTrick)
    .delete('/tricks', trickController.deleteAllTricks)
    .delete('/tricks/:id', trickController.deleteTrickById);

module.exports = router;

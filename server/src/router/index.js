const Router = require('koa-router');
const trickController = require("../controller/trickController");
const userController = require("../controller/userController");
const gradeController = require("../controller/gradeController");
const router = new Router();

router
    .get('/user', userController.getUserList)
    .get('/user/:id', userController.getUserById)
    .post('/user', userController.createUser)
    .patch('/user', userController.updateUser)
    .delete('/user/:id', userController.deleteUserById)
    .get('/tricks', trickController.getTrickList)
    .get('/tricks/:id', trickController.getTrickById)
    .patch('/tricks/:id', trickController.updateTrick)
    .post('/tricks', trickController.createTrick)
    .delete('/tricks', trickController.deleteAllTricks)
    .delete('/tricks/:id', trickController.deleteTrickById)
    .get('/grade/level/:id', gradeController.getUserLevelById)
    .get('/grade/tricks', gradeController.getTrickListByUserId)
    .get('/grade/tricks/:id', gradeController.getUserListByTrickId)
    .post('/grade/join/:id', gradeController.joinTrickToUser)
    .post('/grade/mark/:id', gradeController.markTrickAsDone)
    .delete('/grade/join/:id', gradeController.unJoinTrickToUser)
    .delete('/grade/mark/:id', gradeController.unmarkTrickAsDone);

module.exports = router;

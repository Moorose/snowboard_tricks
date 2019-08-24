const Router = require('koa-router');
const trickController = require("../controller/trickController");
const userController = require("../controller/userController");
const router = new Router();

router
    .get('/user', userController.getUserList)
    .get('/user/:id', userController.getUserById)
    .get('/user/:userId/level', userController.getUserLevelById)
    .get('/user/:userId/tricks', userController.getTrickListByUserId)
    .post('/user', userController.createUser)
    .post('/user/:userId/tricks/:trickId', userController.joinTrickToUser)
    .patch('/user', userController.updateUser)
    .patch('/user/:userId/tricks/:trickId/mark', userController.markTrick)
    .delete('/user/:id', userController.deleteUserById)
    .delete('/user/:userId/tricks/:trickId', userController.unJoinTrickToUser)
    .get('/tricks', trickController.getTrickList)
    .get('/tricks/:id', trickController.getTrickById)
    .get('/tricks/users/:userId', trickController.getUserListByTrickId)
    .post('/tricks', trickController.createTrick)
    .patch('/tricks/:id', trickController.updateTrick)
    .delete('/tricks', trickController.deleteAllTricks)
    .delete('/tricks/:id', trickController.deleteTrickById);

// exports post('', openThread
// exports get('', getThreadInvite
// exports patch('', acceptInvite
// exports get('', getThreadById
// exports delete('', leaveThread
// exports get('', getThreadByUser
// exports delete('', closeThread
// exports post('', addMessage
// exports get('', getMessages

module.exports = router;

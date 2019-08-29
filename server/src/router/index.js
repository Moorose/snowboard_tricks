
const Router = require('koa-router');
const trickController = require('../controller/trickController');
const userController = require('../controller/userController');
const threadController = require('../controller/threadController');
const awsController = require('../controller/awsController');

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
  .patch('/user/tricks/update', userController.updateUserTrick)
  .delete('/user/:id', userController.deleteUserById)
  .delete('/user/:userId/tricks/:trickId', userController.unJoinTrickToUser)
  .get('/tricks', trickController.getTrickList)
  .get('/tricks/:id', trickController.getTrickById)
  .get('/tricks/:trickId/users', trickController.getUserListByTrickId)
  .get('/tricks/:trickId/users/:userId', trickController.getUserTrick)
  .post('/tricks', trickController.createTrick)
  .patch('/tricks/:id', trickController.updateTrick)
  .delete('/tricks', trickController.deleteAllTricks)
  .delete('/tricks/:id', trickController.deleteTrickById)
  .get('/aws/bucket/check', awsController.checkBucket)
  .get('/aws/:fileName/check', awsController.checkFile)
  .get('/aws/:fileName/put/url', awsController.getSignedUrlForPut)
  .get('/aws/:fileName/get/url', awsController.getSignedUrlForGet)
  .get('/user/:userId/invite', threadController.getThreadInvite)
  .get('/user/:userId/thread', threadController.getThreadByUserId)
  .get('/user/thread/:threadId', threadController.getThreadById)
  .get('/user/thread/:threadId/members', threadController.getUsersByThreadId)
  .get('/user/thread/:threadId/message', threadController.getMessages)
  .post('/user/:userId/thread/:userTrickId/open', threadController.openThread)
  .post('/user/:userId/thread/:threadId/message', threadController.addMessage)
  .patch('/user/:userId/invite/:inviteId', threadController.acceptInvite)
  .delete('/user/:userId/invite/:inviteId', threadController.deleteInvite)
  .delete('/user/:userId/thread/:threadId/leave', threadController.leaveThread)
  .delete('/user/:userId/thread/:threadId/close', threadController.closeThread);

module.exports = router;

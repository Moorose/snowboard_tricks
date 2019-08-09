const Router = require('koa-router');
const trickController = require("../controller/trickController");
const router = new Router();

router
    .get('/tricks',trickController.getTrickList)
//   .get('/me', isAuthenticated, getCurrentUser)
//   .get('/users/:id', getUser)
//   .get('/users', isAuthenticated, getUsers)
//   .get('/users/:id/posts', isAuthenticated, getUserPosts)
//   .get('/users/:id/friends', isAuthenticated, getUserFriends)
//   .get('/friend-requests', isAuthenticated, getFriendRequests)
//   .get('/feed', isAuthenticated, getUserFeed)
    .post('/tricks', trickController.postTrick);
//   .post('/login', login)
//   .post('/logout', isAuthenticated, logout)
//   .post('/post', isAuthenticated, addPost)
//   .post('/friend-requests', isAuthenticated, sendFriendRequest)
//   .post('/friend-requests/:id', isAuthenticated, acceptFriendRequest)
//   .delete('/friend-requests/:id', isAuthenticated, rejectFriendRequest);

module.exports = router;

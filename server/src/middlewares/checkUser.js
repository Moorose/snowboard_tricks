const userService = require('../service/userService');

exports.isUser = async (session) => {
  if (session) {
    const users = await userService.getUserList();
    if (users.length !== 0) {
      return users[0];
    }
  }
  throw new Error('User table is empty!');
};

exports.isAdmin = async (session) => {
  if (session) {
    const users = await userService.getUserList();
    if (users.length !== 0) {
      return users[0];
    }
  }
  throw new Error('User table is empty!');
};

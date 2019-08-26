'use strict';
const userService = require("../service/userService");

exports.isUser = async (session) => {
  if (session) {
    const users = await userService.getUserList();
    if (users.length !== 0) {
      console.log('Current user:', users[0].dataValues);
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

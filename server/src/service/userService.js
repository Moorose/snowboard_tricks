const { User } = require('../models');

exports.createUser = ({
  nickname, fullName, email, description,
}) => (
  User.create({
    fullName,
    nickname,
    email,
    description,
  })
);

exports.updateUser = ({
  id, nickname, fullName, email, description,
}) => (
  User.update(
    {
      fullName,
      nickname,
      email,
      description,
    },
    {
      where: {
        id,
      },
    },
  )
);

exports.getUserById = (id) => (
  User.findOne({
    where: {
      id,
    },
  })
);

exports.getUserList = () => User.findAll();

exports.destroyUserById = (id) => (
  User.destroy({
    where: {
      id,
    },
  })
);

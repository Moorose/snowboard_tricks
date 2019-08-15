"use strict";

const { Trick } = require("../models");

exports.createTrick = async ({ name, complexity, description }) => {
  return await Trick.create({
    name,
    complexity,
    description,
  });
};

exports.updateTrick = async ({ id, name, complexity, description }) => {
  return await Trick.update(
    {
      name,
      complexity,
      description,
    },
    {
      where: {
        id: id,
      },
    },
  );
};

exports.getTrickById = async id => {
  return await Trick.findOne({
    where: {
      id: id,
    },
  });
};

exports.getTrickList = async () => {
  return await Trick.findAll();
};

exports.destroyTrickById = async id => {
  return await Trick.destroy({
    where: {
      id: id,
    },
  });
};

exports.destroyAllTricks = async () => {
  return await Trick.destroy({
    where: {},
  });
};

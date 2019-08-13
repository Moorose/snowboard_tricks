"use strict";

const { Trick } = require("../models");

exports.addTrick = async ({ name, complexity, description }) => {
  return await Trick.create({
    name: name,
    complexity: complexity,
    description: description,
  });
};

exports.updateTrick = async ({ id, name, complexity, description }) => {
  return await Trick.update({
    name: name,
    complexity: complexity,
    description: description,
  },{
    where: {
      id: id
    }
  });
};

exports.getTrickById = async id => {
  return await Trick.findOne({
    where: {
        id: id,
    },
});
  // return await Trick.findByPk(id);
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

exports.destroyAllTrick = async () => {
  return await Trick.destroy({
    where: {},
  });
};

'use strict';

const { Trick } = require("../models");

exports.addTrick = async ({name, complexity, description}) => {
    return await Trick.create({
        name:name,
        complexity:complexity,
        description:description
    });
};

exports.getTrickById = async (id) => {
    return await Trick.findById(id);
};

exports.getTrickList = async () => {
    return await Trick.findAll();
};

exports.destroyTrickById = async (id) => {
    return await Trick.destroyById(id);
};

exports.destroyAllTrick = async () => {
    return await Trick.clearTable();
};
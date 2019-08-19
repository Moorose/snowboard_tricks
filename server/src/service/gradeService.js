"use strict";

const {User, Trick} = require("../models");

exports.joinTrickToUser = async (userId, trickId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const trick = await Trick.findByPk(trickId);
    if (!trick) throw new Error('Trick was not found!');
    await user.addTrick(trick, {through: {mark: false}});
};


exports.unjoinTrickToUser = async (userId, trickId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const tricks = await user.getTricks();
    if (!tricks) throw new Error('Tricks were not found!');
    for (trick of tricks) {
        if (trick.id === trickId) {
            return await trick.grade.destroy();
        }
    }
};

exports.markTrickAsDone = async (userId, trickId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const trick = await user.findOne({where: {id: trickId}});
    if (!trick) throw new Error('Trick was not found!');
    await trick.grade.update({mark: true});
};

exports.unmarkTrickAsDone = async (userId, trickId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const trick = await user.findOne({where: {id: trickId}});
    if (!trick) throw new Error('Trick was not found!');
    await trick.grade.update({mark: true});
};

exports.getUserListByTrickId = async (trickId) => {
    const trick = await Trick.findByPk(trickId);
    if (!trick) throw new Error('Trick was not found!');
    return await trick.getUsers();
};

exports.getTrickListByUserId = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Users were not found!');
    return await user.getTricks();
};


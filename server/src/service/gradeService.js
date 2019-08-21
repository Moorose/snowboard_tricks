"use strict";


const {sequelize, User, Trick} = require("../models");

exports.joinTrickToUser = async (userId, trickId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const trick = await Trick.findByPk(trickId);
    if (!trick) throw new Error('Trick was not found!');
    await user.addTrick(trick, {through: {mark: false}});
};


exports.unJoinTrickToUser = async (userId, trickId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const [trick] = await user.getTricks({where: {id: trickId}});
    if (!trick) throw new Error('Tricks were not found!');
    return await trick.grade.destroy();
};

exports.markTrick = async (userId, trickId, done) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const [trick] = await user.getTricks({where: {id: trickId}});
    if (!trick) throw new Error('Trick was not found!');
    const updateCount = await sequelize.query('UPDATE grade SET mark=:done WHERE "UserId" = :userId AND "TrickId" = :trickId;',
        {
            replacements: {done, userId, trickId},
            type: sequelize.QueryTypes.UPDATE
        });
    if (updateCount === 0)
        throw new Error('Update query error');
};

exports.getUserListByTrickId = async (trickId) => {
    const trick = await Trick.findByPk(trickId);
    if (!trick) throw new Error('Trick was not found!');
    return await trick.getUsers();
};

exports.getTrickListByUserId = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    return await user.getTricks();
};

exports.getUserLevel = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User was not found!');
    const tricks = await user.getTricks();
    let exp = 0;
    for (let trick of tricks) {
        exp += trick.complexity;
    }
    return {
        level: Math.floor(exp / 1000),
        exp
    };
};
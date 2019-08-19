"use strict";

const {User} = require("../models");

exports.createUser = async ({nickname, fullName, email, description}) => {
    return await User.create({
        fullName,
        nickname,
        email,
        description,
    });
};

exports.updateUser = async ({id, nickname, fullName, email, description}) => {
    return await User.update(
        {
            fullName,
            nickname,
            email,
            description,
        },
        {
            where: {
                id: id,
            },
        },
    );
};

exports.getUserById = async id => {
    return await User.findOne({
        where: {
            id: id,
        },
    });
};

exports.getUserList = async () => {
    return await User.findAll();
};

exports.destroyUserById = async id => {
    return await User.destroy({
        where: {
            id: id,
        },
    });
};

const userService = require("../service/userService");

exports.checkUser = async (COOCKE) => {
    if (COOCKE) {
        const users = await userService.getUserList();
        if (users.length != 0) {
            return users[0];
        }
    }
};

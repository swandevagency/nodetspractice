const {Client} = require("pg");

import createAdmin from "./createAdmin";
import getAdminByCredentials from "./getAdminByCredentials";
import getAdminById from "./getAdminById";
import getAdminByEmail from "./getAdminByEmail";
import confirmAdmin from "./confirmAdmin";
import addRefreshTokenToDatabase from "./addRefreshTokenToDatabase";
import validateRefreshToken from "./validateRefreshToken";
import checkEmailExistance from "./checkEmailExistance";
import checkUsernameExistance from "./checkUsernameExistance";

module.exports = {
    createAdmin: createAdmin(Client),
    getAdminByCredentials: getAdminByCredentials(Client),
    getAdminById: getAdminById(Client),
    getAdminByEmail: getAdminByEmail(Client),
    confirmAdmin: confirmAdmin(Client),
    validateRefreshToken: validateRefreshToken(Client),
    addRefreshTokenToDatabase: addRefreshTokenToDatabase(Client),
    checkEmailExistance: checkEmailExistance(Client),
    checkUsernameExistance: checkUsernameExistance(Client),

}
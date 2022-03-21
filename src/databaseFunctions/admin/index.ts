const {Client} = require("pg");

import createAdmin from "./createAdmin";
import getAdminByCredentials from "./getAdminByCredentials";

module.exports = {
    createAdmin: createAdmin(Client),
    getAdminByCredentials: getAdminByCredentials(Client)
}
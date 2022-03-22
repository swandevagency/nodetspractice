const {Client} = require("pg");

import createAdmin from "./createAdmin";
import getAdminByCredentials from "./getAdminByCredentials";
import getAdminById from "./getAdminById";
import getAdminByEmail from "./getAdminByEmail";
import confirmAdmin from "./confirmAdmin"

module.exports = {
    createAdmin: createAdmin(Client),
    getAdminByCredentials: getAdminByCredentials(Client),
    getAdminById: getAdminById(Client),
    getAdminByEmail: getAdminByEmail(Client),
    confirmAdmin: confirmAdmin(Client)

}
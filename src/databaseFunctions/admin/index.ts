const {Client} = require("pg");

import createAdmin from "./createAdmin";
import getAdmin from "./getAdmin";

module.exports = {
    createAdmin: createAdmin(Client),
    getAdmin: getAdmin(Client)
}
import jwt from "jsonwebtoken"


import generate from "./generate";
import validate from "./validate";

module.exports = {
    generate: generate(jwt),
    validate: validate(jwt),
}
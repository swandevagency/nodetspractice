import encrypt from "./encrypt";
import decrypt from "./decrypt";

import {createCipher, createDecipher} from "crypto";


module.exports =  {
    encrypt: encrypt(createCipher),
    decrypt: decrypt(createDecipher)
}
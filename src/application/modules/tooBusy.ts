const toobusy = require('toobusy-js');

module.exports = (req:any, res:any, next:any) => {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
        next();
    }
}
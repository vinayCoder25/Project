const fs = require('fs');

const errorLogger = (err, req, res, next) => {
    fs.appendFile('ErrorLogger.txt', new Date().toDateString() + " : " + err.stack + "\n", (error) => {
        if(error) {
            console.log("error in logging file");
        }
    })

    if(err.status) {
        res.status = err.status;
    } else {
        res.status = 500;
    }
    res.json({"message": err.message, "success": false});
}

module.exports = errorLogger;
'use strict';
let cfg = require('../env/config');

let options = {
    promiseLib: Promise,
    error: function (err, e) {
        console.error("Error: " + err);
        if (e.cn) {
            console.log("Connection error:" + e.cn);
        }
        if (e.query) {
            console.error("Query:", e.query);
            if (e.params) {
                console.error("Parameters:", e.params);
            }
        }
    }
};

let pgp = require('pg-promise')(options);
let db = pgp(cfg.conString);

module.exports = db;
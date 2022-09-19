'use strict';

const config = require("./config.json");

const mysql = require('mysql2');
const Common = require("../helpers/common.helper");

//local mysql db connection
const dbWrite = mysql.createPool({
  host     : config.db.write.host,
  user     : config.db.write.user,
  password : config.db.write.password,
  database : config.db.write.database
});

const dbRead = mysql.createPool({
  host     : config.db.read.host,
  user     : config.db.read.user,
  password : config.db.read.password,
  database : config.db.read.database
});

module.exports.dbWrite = dbWrite.promise();
module.exports.dbRead = dbRead.promise();
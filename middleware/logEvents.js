const { DateTime } = require("luxon")
const { v4:uuid } = require("uuid")
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const logEvents = async (message, logName) => {
  const dateTime = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
      if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
          await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
      }

      await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
      console.log(err);
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
}

module.exports = { logger, logEvents };
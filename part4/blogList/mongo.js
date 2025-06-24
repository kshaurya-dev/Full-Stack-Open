const mongoose= require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('connecting to test database ' ,config.MONGODB_URI_TEST )
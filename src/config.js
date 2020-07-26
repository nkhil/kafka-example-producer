'use strict';

const { name } = require('../package.json');

module.exports = {
  name,
  port: 8080,
  kafka: {
    kafka_server: 'localhost:2181',
  }
};

module.exports = function(gulp, plugins, config) {
  return function() {
    var karma = require('karma');

    var server = new karma.Server({
      configFile: process.cwd() + '/karma.conf.js'
    });

    server.start();
  }
};

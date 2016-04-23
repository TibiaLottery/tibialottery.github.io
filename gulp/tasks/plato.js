module.exports = function(gulp, plugins, config) {
  return function() {
    var plato = require('plato');

    var options = {
      title: 'Plato Inspections Report'
    };

    plato.inspect(config.js, config.analysis + '/plato', options, function() {});
  }
};

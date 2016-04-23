module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/lib';

    del.sync(dest);
    return gulp
      .src(config.lib)
      .pipe(gulp.dest(dest));
  };
};

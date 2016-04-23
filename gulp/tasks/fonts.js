module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/fonts';

    del.sync(dest);
    return gulp
      .src(config.fonts)
      .pipe(gulp.dest(dest));
  };
};

module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/icons';

    del.sync(dest);
    return gulp.src(config.icons)
      .pipe(plugins.iconfont({
        fontName: 'usft-icons',
        formats: ['ttf', 'eot', 'woff', 'woff2'],
        timestamp: Math.round(Date.now() / 1000),
        normalize: true,
        fontHeight: 1001
      }))
      .on('glyphs', function (glyphs) {
        gulp
          .src(config.content + '/icons/template.scss')
          .pipe(plugins.consolidate('lodash', {
            glyphs: glyphs
          }))
          .pipe(plugins.sass())
          .pipe(plugins.cssnano())
          .pipe(plugins.rename('usft-icons.min.css'))
          .pipe(gulp.dest(dest));
      })
      .pipe(gulp.dest(dest));
  };
};

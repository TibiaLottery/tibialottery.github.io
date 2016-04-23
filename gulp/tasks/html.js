module.exports = function (gulp, plugins, config) {
    return function () {
        var del = require('del');
        var dest = config.build;

        del.sync([dest + '/*.html', dest + '/app']);
        return gulp
            .src(config.html)
            .pipe(plugins.htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(dest));
    };
};

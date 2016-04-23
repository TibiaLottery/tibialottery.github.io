module.exports = function(gulp, plugins, config) {
  return function() {
    var del = require('del');
    var bower = require('bower');
    var dest = config.build + '/bower';

    return del(dest).then(function() {
      bower.commands.install([], {
          forceLatest: true
        }, {
          directory: dest
        })
        .on('end', function(data) {
          //****** Angular Material Custom Build ******

          var js = [
            dest + '/angular-material/modules/js/core/core.js',
            dest + '/angular-material/modules/js/backdrop/backdrop.js',
            dest + '/angular-material/modules/js/button/button.js',
            //Icon needed for Tabs module
            dest + '/angular-material/modules/js/icon/icon.js',
            dest + '/angular-material/modules/js/sidenav/sidenav.js',
            dest + '/angular-material/modules/js/tabs/tabs.js',
            dest + '/angular-material/modules/js/tooltip/tooltip.js',
          ];

          var css = [
            dest + '/angular-material/modules/js/core/core.css',
            dest + '/angular-material/modules/js/backdrop/backdrop.css',
            dest + '/angular-material/modules/js/button/button.css',
            //Icon needed for Tabs module
            dest + '/angular-material/modules/js/icon/icon.css',
            dest + '/angular-material/modules/js/sidenav/sidenav.css',
            dest + '/angular-material/modules/js/tabs/tabs.css',
            dest + '/angular-material/modules/js/tooltip/tooltip.css',
          ];

          gulp
            .src(js)
            .pipe(plugins.concat('angular-material-custom.min.js'))
            .pipe(plugins.insert.prepend('!(function(){angular.module("ngMaterial", ["ng","ngAnimate","ngAria","material.core","material.components.backdrop","material.components.button","material.components.sidenav","material.components.tabs","material.components.tooltip"]);})();'))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(dest + '/angular-material'));

          gulp
            .src(css)
            .pipe(plugins.concat('angular-material-custom.min.css'))
            .pipe(plugins.cssnano())
            .pipe(gulp.dest(dest + '/angular-material'));
        });
    });
  }
};

module.exports = function(gulp, plugins, config) {
  return function() {
    console.log('\nStarting BrowserSync ...\n');

    var browserSync = require('browser-sync').create();

    browserSync.init({
      server: './'
    });

    gulp.watch(config.html, function(event) {
      browserSyncReload(event, 'html');
    });

    gulp.watch(config.js, function(event) {
      browserSyncReload(event, 'js');
    });

    gulp.watch(config.cssWatch, function(event) {
      browserSyncReload(event, 'css');
    });

    function browserSyncReload(event, task) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');

      gulp.start(task, function() {
        if (task === 'css') {
          browserSync.reload("*.css");
        } else {
          browserSync.reload();
        }
      });
    }
  }
};

var argv = require('yargs').argv;

var _analysis = './analysis';
var _build = './build';

var _client = './public';
var _app = _client + '/app';
var _content = _client;

module.exports = {
  isDevelopment: argv.env === 'development',
  isProduction: argv.env === 'production',
  analysis: _analysis,
  build: _build,
  content: _content,
  html: _client + '/**/*.html',
  js: [
    _app + '/init.js',
    _app + '/**/*.js',
    _content + '/js/**/*.js',
    '!' + _app + '/**/*.spec.js',
    '!' + _content + '/js/**/*.spec.js',
    '!' + _content + '/libs/**/*.js'
  ],
  css: [
    _app + '/**/*.css',
    _content + '/sass/**/*.css',
    _app + '/**/*.scss',
    _content + '/sass/**/*.scss',
    '!' + _app + '/**/_*.scss',
    '!' + _content + '/sass/**/_*.scss'
  ],
  cssWatch: [
    _app + '/**/*.css',
    _content + '/sass/**/*.css',
    _app + '/**/*.scss',
    _content + '/sass/**/*.scss'
  ],
  lib: _content + '/lib/**/*',
  fonts: _content + '/fonts/**/*',
  icons: _content + '/icons/**/*.svg',
  img: _content + '/img/**/*',
  staticCSS: _content + '/static/**/*.css'
};

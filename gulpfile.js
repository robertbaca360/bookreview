
//  G U L P F I L E
//  ======================================================
//  Run the server, transpile LESS, watch for file changes

//  Dependencies
//  ------------
var gulp = require('gulp'),
    less = require('gulp'),
    gls  = require('gulp-live-server');

//  (TASK) Transpile LESS
//  ---------------------
gulp.task('less', function() {
  gulp.src('./src/public/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./src/public/css'));
});

//  (TASK) Run the local server
//  ---------------------------
gulp.task('server', function() {
  var server = gls('./src/index.js', {NODE_ENV: 'development', PORT: 2666});
  server.start();

  gulp.watch(['gulpfile.js', './src/index.js', './src/{controllers,models,lib}/**/*.js'], function() {
    server.start.bind(server)()
  });
});

//  (TASK) Watch for file changes
//  -----------------------------
gulp.task('watch', function() {
  gulp.watch(['./src/public/less/**/*.less'], ['less']);
});

//  Default task
//  ------------
gulp.task('default', ['watch', 'server']);

var del        = require('del');
var gulp       = require('gulp');
var typescript = require('gulp-typescript');
var tscConfig  = require('./tsconfig.json');
var livereload = require('gulp-livereload');

var app  = './src';
var dist = './release';

var paths = {
  js: {
    libs: [
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/angular2/bundles/angular2.min.js'
    ],
    src: [
      app + '/app.ts'
    ]
  },
  misc: [
    app + '/index.html'
  ]
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('libsCopy', function() {
  return gulp.src(paths.js.libs).pipe(gulp.dest(dist + '/js/'));
});

gulp.task('miscCopy', function() {
  return gulp.src(paths.misc)
  .pipe(gulp.dest(dist))
  .pipe(livereload());
});

gulp.task('ts2js', function() {
  var tsResult = gulp.src(paths.js.src)
  .pipe(typescript(tscConfig.compilerOptions));

  return tsResult.js.pipe(gulp.dest(dist + '/js/')).pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.js.src, ['ts2js']);
  gulp.watch(paths.misc, ['miscCopy']);
});

gulp.task('default', [
  'clean',
  'libsCopy',
  'miscCopy',
  'ts2js'
]);
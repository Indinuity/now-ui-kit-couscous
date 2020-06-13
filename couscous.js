var gulp         = require('gulp')
var path         = require('path')
var sass         = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var minifyCSS    = require('gulp-clean-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')
var merge        = require('merge-stream');

var Settings = {
  TOOLKIT: 'theme'
};

var Paths = {
  HERE                 : './',
  WEB_CSS   		   : './template/css',
  WEB_JS    		   : './template/js',
  WEB_FONTS    		   : './template/fonts',
  FONT_SOURCES		   : [
    './node_modules/now-ui-kit/assets/fonts/*'
  ],
  DIST                 : 'dist',
  DIST_TOOLKIT_JS      : 'dist/'+Settings.TOOLKIT+'.js',
  SCSS_TOOLKIT_SOURCES : './src/scss/'+Settings.TOOLKIT+'*',
  CSS				   : [	
  ],
  // third party js
  JS                   : [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/js/dist/collapse.js',
  ],
  // our js
  JS_APP				: [
	  './src/js/'+Settings.TOOLKIT+'.js',
  ]
};

gulp.task('js', function () {
  return gulp.src(Paths.JS.concat(Paths.JS_APP))
    .pipe(concat(Settings.TOOLKIT+".js"))
    .pipe(gulp.dest(Paths.DIST))
});

gulp.task('js-dev', function () {
  return gulp.src(Paths.JS)
    .pipe(concat(Settings.TOOLKIT+".js"))
    .pipe(rename({
      suffix: '.dev'
    }))
    .pipe(gulp.dest(Paths.DIST))
    .pipe(gulp.dest(Paths.WEB_JS))
});

gulp.task('js-min', gulp.series(['js-dev', 'js'], function () {
  return gulp.src(Paths.DIST_TOOLKIT_JS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(Paths.DIST))
    .pipe(gulp.dest(Paths.WEB_JS))
}));

gulp.task('css', function () {
  var scssStream = gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat("scss-files.css"));
    
  return merge(scssStream)
    .pipe(concat(Settings.TOOLKIT+".css"))
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST));
});

gulp.task('css-min', gulp.series(['css'], function () {
  var scssStream = gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat("scss-files.css"));
    
  return merge(scssStream)
    .pipe(concat(Settings.TOOLKIT+".css"))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST))
    .pipe(gulp.dest(Paths.WEB_CSS));
}));

//Fonts
gulp.task('fonts', function() {
  return gulp.src(Paths.FONT_SOURCES)
    .pipe(gulp.dest(Paths.WEB_FONTS));
});

gulp.task('server', function () {
  connect.server({
    root: 'docs',
    port: 9001,
    livereload: true
  })
});

gulp.task('default', gulp.parallel(['css-min', 'js-min', 'fonts']));

gulp.task('watch', function () {
  gulp.watch(Paths.SCSS_TOOLKIT_SOURCES, ['css-min']);
  gulp.watch(Paths.JS,   ['js-min']);
});

gulp.task('docs', gulp.series(['server'], function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/docs/'}))
}));

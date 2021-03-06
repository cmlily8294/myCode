var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver'); // 静态文件服务器

var handleError = function(err) {
  var colors = gutil.colors;
  console.log('\n');
  gutil.log(colors.red('Error!'));
  gutil.log('fileName: ' + colors.red(err.fileName));
  gutil.log('lineNumber: ' + colors.red(err.lineNumber));
  gutil.log('message: ' + err.message);
  gutil.log('plugin: ' + colors.yellow(err.plugin));
};

gulp.task('watchjs', function() {
  gulp.watch('src/js/**/*.js', function(event) {
    var paths = watchPath(event, 'src/', 'dist/');
    /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);

    var combined = combiner.obj([
      gulp.src(paths.srcPath),
      // sourcemaps.init(),
      // uglify(),
      // sourcemaps.write('./'),
      gulp.dest(paths.distDir)
    ]);

    combined.on('error', handleError);
  });
});

gulp.task('uglifyjs', function() {
  var combined = combiner.obj([
    gulp.src('src/js/**/*.js'),
    // sourcemaps.init(),
    // uglify(),
    // sourcemaps.write('./'),
    gulp.dest('dist/js/')
  ]);
  combined.on('error', handleError);
});

gulp.task('watchcss', function() {
  gulp.watch('src/css/**/*.css', function(event) {
    var paths = watchPath(event, 'src/', 'dist/');

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);

    gulp
      .src(paths.srcPath)
      // .pipe(sourcemaps.init())
      .pipe(
        autoprefixer({
          browsers: 'last 2 versions'
        })
      )
      // .pipe(minifycss())
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.distDir));
  });
});

gulp.task('minifycss', function() {
  gulp
    .src('src/css/**/*.css')
    // .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: 'last 2 versions'
      })
    )
    // .pipe(minifycss())
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('watchless', function() {
  gulp.watch('src/less/**/*.less', function(event) {
    var paths = watchPath(event, 'src/less/', 'dist/css/');

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);
    var combined = combiner.obj([
      gulp.src(paths.srcPath),
      // sourcemaps.init(),
      less(),
      autoprefixer({
        browsers: 'last 2 versions'
      }),
      // minifycss(),
      // sourcemaps.write('./'),
      gulp.dest(paths.distDir)
    ]);
    combined.on('error', handleError);
  });
});

gulp.task('lesscss', function() {
  var combined = combiner.obj([
    gulp.src('src/less/**/*.less'),
    // sourcemaps.init(),
    less(),
    autoprefixer({
      browsers: 'last 2 versions'
    }),
    // minifycss(),
    // sourcemaps.write('./'),
    gulp.dest('dist/css/')
  ]);
  combined.on('error', handleError);
});

gulp.task('watchsass', function() {
  gulp.watch('src/sass/**/*', function(event) {
    var paths = watchPath(event, 'src/sass/', 'dist/css/');

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);
    sass(paths.srcPath)
      .on('error', function(err) {
        console.error('Error!', err.message);
      })
      .pipe(sourcemaps.init())
      .pipe(minifycss())
      .pipe(
        autoprefixer({
          browsers: 'last 2 versions'
        })
      )
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.distDir));
  });
});

gulp.task('sasscss', function() {
  sass('src/sass/*')
    .on('error', function(err) {
      console.error('Error!', err.message);
    })
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(
      autoprefixer({
        browsers: 'last 2 versions'
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watchimage', function() {
  gulp.watch('src/images/**/*', function(event) {
    var paths = watchPath(event, 'src/', 'dist/');

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);

    gulp
      .src(paths.srcPath)
      // .pipe(
      //   imagemin({
      //     progressive: true
      //   })
      // )
      .pipe(gulp.dest(paths.distDir));
  });
});

gulp.task('image', function() {
  gulp
    .src('src/images/**/*')
    // .pipe(
    //   imagemin({
    //     progressive: true
    //   })
    // )
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watchcopy', function() {
  gulp.watch('src/fonts/**/*', function(event) {
    var paths = watchPath(event, 'src/', 'dist/');

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);

    gulp.src(paths.srcPath).pipe(gulp.dest(paths.distDir));
  });
});

gulp.task('copy', function() {
  gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watchHtml', function() {
  gulp.watch('src/**/*.html', function(event) {
    var paths = watchPath(event, 'src/', 'dist/');

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
    gutil.log('Dist ' + paths.distPath);

    gulp.src(paths.srcPath).pipe(gulp.dest(paths.distDir));
  });
});
gulp.task('html', function() {
  gulp.src('src/**/*.html').pipe(gulp.dest('dist/'));
});

// 静态文件服务器
gulp.task(
  'webserver',
  [
    'html',
    'uglifyjs',
    'minifycss',
    'lesscss',
    'sasscss',
    'image',
    'copy',
    'watchHtml',
    'watchjs',
    'watchcss',
    'watchless',
    'watchsass',
    'watchimage',
    'watchcopy'
  ],
  function() {
    gulp.src('').pipe(
      webserver({
        port: 8888,
        directoryListing: true,
        open: 'http://localhost:8888/dist/index.html'
      })
    );
  }
);

// 清理
gulp.task('clean', function() {
  return gulp.src(['dist/*'], { read: false }).pipe(clean());
});

// 默认任务
gulp.task('default', ['clean'], function() {
  gulp.start('webserver');
});

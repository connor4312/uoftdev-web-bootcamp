var gulp         = require('gulp'),
    $            = require('gulp-load-plugins')();

var globs = {
    css: 'src/css/**/*.less',
    js: 'src/js/flickrsearch.js',
    html: 'src/*.{ejs,html}',
    images: 'src/img/**',
    misc: 'src/**/*.{ico,eot,woff,ttf,php,xml}'
};

gulp.task('css', function() {
    gulp.src('src/css/style.less')
        .pipe($.less())
        .pipe($.autoprefixer('last 3 versions'))
        .pipe(gulp.dest('static/css'));
});
gulp.task('js', function () {
    gulp.src(globs.js)
        .pipe($.browserify({
            insertGlobals : true,
            debug : !gulp.env.production,
            shim: {
                angular: {
                    exports: 'angular',
                    path: 'bower_components/angular/angular.js'
                }
            }
        }))
        .pipe(gulp.dest('static/js'));
});
gulp.task('html', function() {
    gulp.src(globs.html)
        .pipe(gulp.dest('static'));
});
gulp.task('images', function() {
    gulp.src(globs.images)
        .pipe(gulp.dest('static/img'));
});
gulp.task('misc', function () {
    gulp.src(globs.misc).pipe(gulp.dest('static'));
});

gulp.task('watch', function () {
    for (var key in globs) {
        $.watch({glob: globs[key], name: key}, [key]);
    }
});

gulp.task('spy', ['watch']);
gulp.task('default', ['html', 'js', 'css', 'images', 'misc']);

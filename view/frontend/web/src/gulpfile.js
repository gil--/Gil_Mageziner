var gulp            = require('gulp');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var sass            = require('gulp-sass');
var csswring        = require('csswring');
var watch           = require('gulp-watch');
var browsersync     = require('browser-sync').create();


/*
    Setup Browser Sync
*/
gulp.task('bs', function() {
    browsersync.init({
        proxy: "magento2.dev"
    });
});

gulp.task('bs-reload', function() {
    browsersync.reload();
});


/*
    Build Sass
*/
gulp.task('styles', function() {
    var processors = [
        autoprefixer('last 2 version', 'ie 11'),
        csswring
    ];
    return gulp.src('scss/styles.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest('../css'))
        .pipe(browsersync.stream({ match: '**/*.scss' }));
});

/*
    Setup Gulp watch task
*/
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['styles']);
    //gulp.watch('js/src/**/*.js', ['scripts']);
    //gulp.watch('../../../app/design/frontend/somethingdigital/default/**/*', ['bs-reload']);
});


/*
    Default gulp task, runs on `gulp`
*/
gulp.task('default', ['styles', 'watch', 'bs']);

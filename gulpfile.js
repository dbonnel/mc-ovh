const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

gulp.task('styles', () => {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'))
        .pipe(rename('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('clean', () => {
    return del([
        'assets/css/styles.css',
    ]);
});

gulp.task('backend', function () {
    return gulp.src([
        'assets/scripts/include/helpers.js',
        'assets/scripts/include/md5.js',
        'assets/scripts/include/file_rw.js',
        'assets/scripts/include/shortkeys.js',
        'assets/scripts/include/macros.js',
        'assets/scripts/include/tex2html.js',
        'assets/scripts/include/editModel.js',
        'assets/scripts/include/editInputView.js',
        'assets/scripts/include/editOutputView.js',
        'assets/scripts/include/editController.js',
        'assets/scripts/include/batch.js',
        'assets/scripts/include/list.js',
        'assets/scripts/include/prism.js',
        'assets/scripts/backend.js',
    ])
        .pipe(concat('backend.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('backend.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('frontend', function () {
    return gulp.src([
        'assets/scripts/include/helpers.js',
        'assets/scripts/frontend.js',
    ])
        .pipe(concat('frontend.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('frontend.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('watch', () => {
    gulp.watch('assets/sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});

gulp.task('default', gulp.series(['clean', 'styles']));
gulp.task('js', gulp.series(['backend', 'frontend']));
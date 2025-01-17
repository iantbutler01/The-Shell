const  gulp  = require('gulp');
const { watch } = require('gulp');

// gulp plugins and utils
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');
const tailwind = require("tailwindcss");

const postcss = require("gulp-postcss")

const sass = require('gulp-sass')(require('node-sass'));

// css plugins
const autoprefixer = require('gulp-autoprefixer');
function reload() {
    browserSync.reload();
}

const plugins = [
  tailwind,
  autoprefixer
]

function styles() {
    return gulp.src('assets/scss/screen.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css/'))
}

function release() {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name + "2";
    var filename = themeName + '.zip';

    styles()

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!assets/scss', '!assets/scss/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
}

function watchFiles() {
    watch(['assets/scss/**/*.scss'], styles);
    watch(['**/*.hbs'], styles);
}


exports.styles = styles;
exports.release = release;
exports.watch = watchFiles;

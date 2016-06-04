var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sh = require('shelljs');

// Public node modules.
var es = require('event-stream');
var lazypipe = require('lazypipe');
var g = require('gulp-load-plugins')({ lazy: false });
var minifyHtml = require("gulp-minify-html");
var ngHtml2Js = require("gulp-ng-html2js");

var paths = require('./gulp.config.json');
var package = require('./package.json');

var noop = g.util.noop;

gulp.watch(paths.sass, ['sass']);
gulp.watch(paths.components, ['components']);
gulp.watch(paths.scripts, ['scripts']);
gulp.watch(paths.assets, ['assets']);
gulp.watch(paths.templates, ['templates']);

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(g.sass())
        .on('error', sass.logError)
        .pipe(g.rename(package.name + '.css'))
        .pipe(gulp.dest('./www/css/'))
        .pipe(g.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(g.rename(package.name + '.min.css'))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

/**
 * Components
 */
gulp.task('components', function () {
    var bowerStream = g.bowerFiles();
    return es.merge(
        bowerStream.pipe(g.filter('**/*.css')).pipe(dist('css', 'components')),
        bowerStream.pipe(g.filter('**/*.js')).pipe(dist('js', 'components'))
    );
});

/**
 * Scripts
 */
gulp.task('scripts', function () {
    console.log(package.name)
    return gulp.src(paths.scripts)
        .pipe(dist('js', package.name, { ngAnnotate: false }));
});

/**
 * Assets
 */
gulp.task('assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest('./www/'));
});

/**
 * Templates
 */
gulp.task('templates', function () {
    return gulp.src(paths.templates)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "ionic",
            declareModule: false
        }))
        .pipe(g.concat("templates.js"))
        .pipe(gulp.dest('./www/js/'))
        .pipe(g.concat("templates.min.js"))
        .pipe(g.uglify())
        .pipe(gulp.dest('./www/js'));
});

/**
 * Dist
 */
gulp.task('dist', ['sass', 'components', 'scripts', 'assets', 'templates'], function () {
    return gulp.src('./app/index.html')
        .pipe(g.inject(gulp.src('./www/css/components.min.css'), {
            ignorePath: 'www',
            addRootSlash: false,
            starttag: '<!-- inject:components:{{ext}} -->',
            addPrefix: ''
        }))

        .pipe(g.inject(gulp.src('./www/js/components.min.js'), {
            ignorePath: 'www',
            addRootSlash: false,
            starttag: '<!-- inject:components:{{ext}} -->',
            addPrefix: ''
        }))
        
        .pipe(g.inject(gulp.src('./www/js/templates.min.js'), {
            ignorePath: 'www',
            addRootSlash: false,
            starttag: '<!-- inject:templates:{{ext}} -->',
            addPrefix: ''
        }))

        .pipe(g.inject(gulp.src('./www/css/' + package.name + '.min.css'), {
            ignorePath: 'www',
            addRootSlash: false,
            addPrefix: ''
        }))

        .pipe(g.inject(gulp.src('./www/js/' + package.name + '.min.js'), {
            ignorePath: 'www',
            addRootSlash: false,
            addPrefix: ''
        }))
        .pipe(gulp.dest('./www'));
});

/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
function dist(ext, name, opt) {
    opt = opt || {};

    return lazypipe()
        .pipe(g.concat, name + '.' + ext)
        .pipe(gulp.dest, './www/' + ext)
        .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
        .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
        .pipe(opt.ngAnnotate ? gulp.dest : noop, './www/' + ext)
        .pipe(ext === 'js' ? g.uglify : g.minifyCss)
        .pipe(g.rename, name + '.min.' + ext)
        .pipe(gulp.dest, './www/' + ext)();
}

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass'])
    gulp.watch(paths.components, ['components'])
    gulp.watch(paths.scripts, ['scripts'])
    gulp.watch(paths.assets, ['assets'])
    gulp.watch(paths.templates, ['templates'])
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
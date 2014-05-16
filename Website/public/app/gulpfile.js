// Setup requirements
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var path = require('path');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;
var pkg = require('./package.json');

// Setup options
var info = {};

info.src = {
	js: ['controllers/*.js', 'directives/*.js', 'services/*.js'],
	bower: {
	    js: ['components/**/dist/**/*.min.js', 'components/angular-notify-toaster/toaster.js', 'components/**/*.min.js', '!components/**/src/**/dist/*.min.js'],
	    css: ['components/**/*.min.css', 'components/angular-notify-toaster/toaster.css', 'components/**/*.min.css', '!components/**/src/**/dist/*.min.css']
	},
	deployable: ['../**', '!../app', './controllers/*.*', './directives/*.*', './filters/*.*', './services/*.*', './views/*.*']
};

info.dest = {
    js: 'build/js',
    bower: {
        js: '../Scripts/vendor',
        css: '../Content/css/vendor'
    },
    cleanable: ['/var/www/html/*'],
    deployable: '/var/www/html/',
    all: 'build/**/*.*'
};

// Karma support function
// TODO: Keep an eye on gulp-karma, however at this stage is not better than this method
function runKarma(configFilePath, options, cb) {
	configFilePath = path.resolve(configFilePath);

	var server = karma.server;
	var config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });

	server.start(config, function(exitCode) {
		cb();
		process.exit(exitCode);
	});
}

// Setup tasks
gulp.task('scripts', function() {
  return gulp.src(info.src.js)
    .pipe(uglify())
    .pipe(concat('all-' + pkg.version + '.js'))
    .pipe(gulp.dest(info.dest.js));
});

gulp.task('test', function(cb) {
	runKarma('karma.conf.js', {
		autoWatch: false,
		singleRun: true
	}, cb);
});

gulp.task('test-dev', function(cb) {
	runKarma('karma.conf.js', {
		autoWatch: true,
		singleRun: false
	}, cb);
});

gulp.task('watch', function() {
  gulp.watch(info.src.js, ['scripts']);
});

gulp.task('clean', function () {
  return gulp.src(info.dest.all, {read: false})
			 .pipe(clean());
});

gulp.task('clean-nix', function(){
	return gulp.src(info.dest.cleanable, {read: false})
	.pipe(clean({force:true}));
});

gulp.task('deploy-nix', function(){
	return gulp.src(info.src.deployable)
			.pipe(debug())
			.pipe(gulp.dest(info.dest.deployable));
});

gulp.task('copy-js-components', function() {
	return gulp.src(info.src.bower.js)
			   .pipe(gulp.dest(info.dest.bower.js));
});

gulp.task('copy-css-components', function () {
    return gulp.src(info.src.bower.css)
			   .pipe(gulp.dest(info.dest.bower.css));
});

gulp.task('first-run', ['copy-js-components', 'copy-css-components']);
gulp.task('release', ['clean', 'scripts']);
gulp.task('development', ['scripts', 'watch']);
gulp.task('run-nix', [/*'clean-nix', */'deploy-nix']);

// Setup requirements
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var path = require('path');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;
var pkg = require('./package.json');

// Setup options
var info = {};

info.src = {
	js: ['controllers/*.js', 'directives/*.js', 'services/*.js'],
	bower: ['components/**/dist/**/*.min.js', 'components/**/*.min.js', '!components/**/src/**/dist/*.min.js']
};

info.dest = {
	js: 'build/js',
	bower: '../Scripts/vendor',
	all: 'build/**/*.*'
}

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

gulp.task('copy-components', function() {
	return gulp.src(info.src.bower)
			   .pipe(gulp.dest(info.dest.bower));
});

gulp.task('first-run', ['copy-components']);
gulp.task('release', ['clean', 'scripts']);
gulp.task('development', ['scripts', 'watch']);

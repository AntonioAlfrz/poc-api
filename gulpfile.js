var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    spawn = require('child_process').spawn,
    node;

gulp.task('default', function () {
    console.log("Gulp done");
});

gulp.task('test', function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha());
});

gulp.task('users', function(){
    return gulp.src(['test/UsersTest.js'])
        .pipe(mocha());
})

gulp.task('watch', function () {
    return gulp.watch(['actionsAPI/*.js','usersAPI/*.js', 'test/*.js', 'routes/*.js', '*.js', 'env.json'], ['test', 'server']);
});

gulp.task('unit-test', function () {
    return gulp.watch('test/*.js')
        .on('change', function (file) {
            gulp.src(file.path)
                .pipe(mocha())
        });
});

// Keep alive server
gulp.task('server', function () {
    if (node) node.kill()
    node = spawn('node', ['start.js'], { stdio: 'inherit' })
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

// clean up if an error goes unhandled.
process.on('exit', function () {
    if (node) node.kill()
});
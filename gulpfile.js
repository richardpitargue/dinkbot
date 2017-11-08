const gulp = require('gulp');
const spawn = require('child_process').spawn;

let node;

gulp.task('start', () => {
    if(node) node.kill();
    node = spawn('node', ['./src/index.js'], { stdio: 'inherit' });
    node.on('close', (code, signal) => {
        if(signal === 'SIGTERM') {
            console.log('\nEither an error has occured or changes has been made.');
            console.log('Please scan the output for any error messages.\n');
        }
    });
});

gulp.task('default', ['start'], () => {
    gulp.watch(['./src/**'], ['start']);
});
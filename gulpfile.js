const gulp   = require('gulp');
const rollup = require('rollup');
const eslint = require('rollup-plugin-eslint');
const spawn  = require('child_process').spawn;

let node;

gulp.task('build', async () => {
    const bundle = await rollup.rollup({
        input: './src/index.js',
        plugins: [
            eslint({
                fix: true
            })
        ]
    });

    await bundle.write({
        file: './build/bundle.js',
        format: 'cjs',
        sourcemap: true
    });
});

gulp.task('start', ['build'], () => {
    if(node) node.kill();
    node = spawn('node', ['build/bundle.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code !== 0) {
            const errMessage = '\n' +
                '--------------------------------------' + '\n' +
                'Error detected, waiting for changes...' + '\n' +
                '--------------------------------------' + '\n';
            console.log(errMessage);
        }
    });
});

gulp.task('default', ['start'], () => {
    gulp.watch(['./src/**/*.js'], ['start']);
});
import eslint from 'rollup-plugin-eslint';

export default {
    input: 'src/index.js',
    output: {
        file: 'build/bundle.js',
        format: 'cjs'
    },
    plugins: [
        eslint()
    ]
}

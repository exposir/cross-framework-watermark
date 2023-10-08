import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    plugins: [
        resolve(),
        vue(),
        terser(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
    ],
    external: ['vue', 'react', 'react-dom']
};

import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    plugins: [
        resolve(),
        vue(),
        terser()
    ],
    external: ['vue', 'react', 'react-dom']
};

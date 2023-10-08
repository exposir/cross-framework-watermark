// 导入必要的 Rollup 插件
import resolve from '@rollup/plugin-node-resolve';  // 用于 Node 依赖解析
import vue from 'rollup-plugin-vue';                // 用于编译 Vue 组件
import { terser } from 'rollup-plugin-terser';      // 用于代码压缩
import babel from '@rollup/plugin-babel';           // 用于通过 Babel 进行代码转换

export default {
    input: 'src/index.js',                          // 打包入口文件
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        }
    ],
    plugins: [
        resolve(),                                   // 解析 Node 依赖
        vue(),                                       // 编译 Vue 组件
        terser(),                                    // 压缩代码
        babel({
            exclude: 'node_modules/**',              // 排除 node_modules 中的文件
            babelHelpers: 'bundled'                  // 包含 Babel 帮助程序
        }),
    ],
    external: ['vue', 'react', 'react-dom']          // 标记这些库为外部依赖，不进行打包
};


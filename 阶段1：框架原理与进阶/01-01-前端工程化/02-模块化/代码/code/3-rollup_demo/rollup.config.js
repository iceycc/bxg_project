import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
    entry : 'src/index.js', //入口
    format:'umd', //规范 兼容 script导入 amd commonjs
    plugins:[
        resolve(),
        babel({
            exclude:'node_modules/**'
        })
    ],
    dest:'build/bundle.js'
}
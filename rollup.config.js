import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [{
    format: 'es',
    file: pkg.module,
    name: pkg.name
  }, {
    format: 'cjs',
    file: pkg.main,
    name: pkg.name
  }],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    json(),
    commonjs({
      exclude: 'node_modules/nodegit/**'
    })
  ]
}

import typescript from '@rollup/plugin-typescript'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  input: './src/main.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'iife',
      name: 'Sentry',
      plugins: [terser()]
    },
    {
      file: './dist/index.common.js',
      format: 'cjs'
    },
    {
      file: './dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    commonjs(),
    typescript(),
    getBabelOutputPlugin({
      allowAllFormats: true,
      configFile: path.resolve(__dirname, 'babel.config.js')
    }),
    nodeResolve()
  ]
}

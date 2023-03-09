import typescript from '@rollup/plugin-typescript'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const production = process.env.NODE_ENV === 'production'

export default [{
  input: './src/main.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'iife',
      name: 'Sentry',
      plugins: [production && terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      })]
    },
    {
      file: './cjs/index.js',
      format: 'cjs'
    },
    {
      file: './esm/index.js',
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
}, {
  input: './src/index.d.ts',
  output: [{
    file: './esm/index.d.ts',
    format: 'es'
  }],
  plugins: [dts()]
}]

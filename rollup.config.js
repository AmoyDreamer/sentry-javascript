import typescript from '@rollup/plugin-typescript'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
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
    },
    {
      file: './dist/index.common.js',
      format: 'cjs',
    },
    {
      file: './dist/index.esm.js',
      format: 'esm',
    }
  ],
  plugins: [
    typescript(),
    getBabelOutputPlugin({
      allowAllFormats: true,
      configFile: path.resolve(__dirname, 'babel.config.js')
    })
  ]
}

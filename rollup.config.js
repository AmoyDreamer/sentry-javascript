import typescript from '@rollup/plugin-typescript'

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
  plugins: [typescript()]
}

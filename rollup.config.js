import { terser } from "rollup-plugin-terser";

export default [
  // ESM build
  {
    input: 'index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  },
  // CommonJS build
  {
    input: 'index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  },
  // UMD build (for browsers)
  {
    input: 'index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'NewsAPI',
      sourcemap: true
    },
    plugins: [terser()]
  }
];

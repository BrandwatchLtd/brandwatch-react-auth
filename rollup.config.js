import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [{
    entry: 'src/BrandwatchReactAuth.js',
    external: ['react', 'prop-types', 'jwt-decode', 'viziaauth'],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
];

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@src': './src',
        '@test': './test',
      }
    }],["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
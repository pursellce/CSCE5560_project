const path = require ('path')

module.exports = {
    entry: {signup: './main/js/signup.js', index: './main/js/index.js', login: './main/js/login.js', mfa: './main/js/mfa.js'},
    output: {
        path: path.resolve(__dirname, 'main/js'),
        filename: '[name].mjs',
    },
    watch: true,
    experiments: {
        topLevelAwait: true
      }
}
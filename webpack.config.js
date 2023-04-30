const path = require ('path')

module.exports = {
    entry: {fb: './main/js/firebase.js', signup: './main/js/signup.js', index: './main/js/index.js', login: './main/js/login.js', payment: './main/js/payment.js', mfa: './main/js/mfa.js'},
    output: {
        path: path.resolve(__dirname, 'main/js'),
        filename: '[name].mjs',
    },
    watch: true
}
const path = require ('path')

module.exports = {
    entry: './main/js/firebase.mjs',
    output: {
        path: path.resolve(__dirname, 'main/js'),
        filename: 'bundle.mjs'
    },
    watch: true
}
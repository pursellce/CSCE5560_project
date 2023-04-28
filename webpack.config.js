const path = require ('path')

module.exports = {
    entry: './main/js/firebase.mjs',
    output: {
        path: path.resolve(__dirname, 'main/js'),
        filename: 'fb.mjs',
    },
    watch: true
}
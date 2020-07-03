/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/vbox.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vbox.js'
    }
};
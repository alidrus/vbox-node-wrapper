/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const path = require("path");
const process = require("process");
const config = require("./config.js");
const commands = require("./commands.js");

console.dir(config);

let cliArguments = [];
process.argv.forEach((argv) => {
    cliArguments.push(path.basename(argv));
});

console.dir(cliArguments);

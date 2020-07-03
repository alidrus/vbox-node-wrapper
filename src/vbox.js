/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const path          = require("path"),
      process       = require("process");

const commands = require("./commands.js"),
      config   = require("./config.js")
      help     = require("./help.js"),
      ls       = require("./ls.js");

// Process command line arguments and get only the basename
let cliArguments = [];
process.argv.forEach((argv) => {
    cliArguments.push(path.basename(argv));
});

if (process.argv.length <= 2 || (process.argv.length >= 3 && process.argv[2] === "help"))
{
    let parameters = Array.from(process.argv);

    parameters.shift();
    parameters.shift();
    parameters.shift();

    help(process.argv, parameters);
    process.exit(0);
}

// VM Listing
if (process.argv[2] == "ls")
{
    console.log(ls(config));
    process.exit(0);
}

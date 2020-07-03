/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const path          = require("path"),
      process       = require("process"),
      { titlecase } = require("stringcase");

const commands = require("./commands.js"),
      config   = require("./config.js")
      package  = require("../package.json"),
      ls       = require("./ls");

// Process command line arguments and get only the basename
let cliArguments = [];
process.argv.forEach((argv) => {
    cliArguments.push(path.basename(argv));
});

if (process.argv.length < 3)
{
    // Show package information
    console.log(titlecase(package.name) + " " + package.version + "\n"
        + package.description + "\n");

    // Show usage information.
    console.log("Usage:");
    console.log("    " + path.basename(process.argv[0]) + " <command> [options [arguments]]\n");

    // Show available commands.
    console.log("Available commands:");
    console.log("    ls    List out available VMs");

    process.exit(0);
}

// VM Listing
if (process.argv[2] == "ls")
{
    console.log(ls(config));
    process.exit(0);
}

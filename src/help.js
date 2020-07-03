/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */
const path          = require("path"),
      { titlecase } = require("stringcase"),
      package  = require("../package.json");

module.exports = function(argv, parameters) {
    // Show package information
    console.log("%s %s", titlecase(package.name), package.version);

    console.group();

    // Show description
    console.log("%s\n", package.description);

    // Show usage information.
    console.log("Usage:");
    console.group();
    console.log("%s <command> [options [arguments]]\n", path.basename(argv[0]));
    console.groupEnd();

    // Show available commands.
    console.log("Available commands:");
    console.group();
    console.log("help      Display help text.");
    console.log("ls        List out available VMs.");
    console.log("start     Start a virtual machine.");
    console.log("shutdown  Stop a virtual machine.");
    console.log("suspend   Save and suspend a virtual machine.\n");
    console.groupEnd();

    console.log("Enter '%s help <command>' for help on that command.", path.basename(argv[0]))

    console.groupEnd();

    console.dir(parameters);
};

/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const process = require("process");
const fs      = require("fs");

if (!process.env.HOME)
{
    console.log("ERROR: HOME environment variable not found");
    process.exit(1);
}

const configurationFile = process.env.HOME + "/.VBoxCLI.json";

if (!fs.existsSync(configurationFile))
{
    console.log("Configuration file not found. Please run 'initialize' at least once.");
    process.exit(1);
}

module.exports = JSON.parse(fs.readFileSync(configurationFile, "utf8"));

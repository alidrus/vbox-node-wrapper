/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

import process from "process";
import fs from "fs";

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

let configuration = JSON.parse(fs.readFileSync(configurationFile, "utf8"));

export default configuration;

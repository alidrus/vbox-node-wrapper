/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const process = require("process"),
      spawn = require('child_process').spawn;

const commands = require("./commands.js");

module.exports = (vmConfig, username) => {
    if (!process.env.SSH_AUTH_SOCK)
    {
        let error = new Error("SSH_AUTH_SOCK environment variable not found");

        error.name = "ERR_SSH_AUTH_SOCK_ENV_MISSING";

        throw error;
    }

    if (!vmConfig["sshHost"] || !vmConfig["sshPort"])
    {
        console.error("Error: sshHost and/or sshPort is not set.")

        process.exit(1);
    }

    commands.ssh(vmConfig["sshHost"], vmConfig["sshPort"], username);
};

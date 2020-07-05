/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const childProcess = require("child_process")
      process      = require("process");

module.exports = {
    vBoxManage: null,

    ssh: null,

    error: null,

    execute(command) {
        return childProcess.execSync(command, {
            encoding: "utf8"
        }).trim();
    },

    sshCommand() {
        if (!this.vBoxManage)
        {
            this.ssh = this.execute('which ssh');
        }

        return this.ssh;
    },

    managerCommand() {
        if (!this.vBoxManage)
        {
            this.vBoxManage = this.execute('which VBoxManage');
        }

        return this.vBoxManage;
    },

    // List available virtual machines
    ls() {
        return this.execute(this.managerCommand() + " list vms");
    },

    // Rename the virtual machine
    rename(uuid, name) {
        return this.execute(this.managerCommand() + " modifyvm " + uuid + " --name '" + name + "'");
    },

    // Get detailed information about the virtual machine
    showvminfo(uuid) {
        return this.execute(this.managerCommand() + " showvminfo " + uuid + " --machinereadable");
    },

    // Shutdown the virtual machine using the ACPI power button
    shutdown(uuid) {
        return this.execute(this.managerCommand() + " controlvm " + uuid + " acpipowerbutton");
    },

    // Start a virtual machine
    start(uuid, headless = true) {
        return this.execute(this.managerCommand() + " startvm " + uuid + (headless ? " --type headless" : ""));
    },

    // Save the virtual machine state and suspend it
    suspend(uuid) {
        return this.execute(this.managerCommand() + " controlvm " + uuid + " savestate");
    },

    ssh(sshHost, sshPort, username, extraParameters) {
        // Spawn options
        const options = {
            stdio: [ 0, 1, 2 ],
            env: process.env
        };

        // Spawn arguments
        const arguments = [
            sshHost,
            '-l', username,
            '-p', sshPort,
            '-A'
        ];

        // If there are extra parameters, append them to the arguments
        extraParameters.forEach((parameter) => {
            arguments.push(parameter);
        });

        // If byobu/tmux/screen is running locally, suppress it from
        // automatically running remotely
        if (process.env.TMUX || process.env.TERM.match(/^screen/))
        {
            arguments.push("-t");
            arguments.push("bash");
        }

        // Spawn ssh
        const ssh = childProcess.spawn(this.sshCommand(), arguments, options);

        // Exit script on remote exit
        ssh.on("exit", function(code, signal) {
            process.exit(0);
        });
    }
};

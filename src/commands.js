/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const execSync = require("child_process").execSync;

module.exports = {
    vbmCommand: null,

    error: null,

    execute(command) {
        return execSync(command, {
            encoding: "utf8"
        }).trim();
    },

    managerCommand() {
        if (!this.vbmCommand)
        {
            this.vbmCommand = this.execute('which VBoxManage');
        }

        return this.vbmCommand;
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
    start(uuid) {
        return this.execute(this.managerCommand() + " startvm " + uuid);
    },

    // Save the virtual machine state and suspend it
    suspend(uuid) {
        return this.execute(this.managerCommand() + " controlvm " + uuid + " ");
    }
};

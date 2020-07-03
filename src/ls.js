/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const commands = require("./commands.js");

module.exports = (config) => {
    let vmList = [];

    commands.ls().split(/[\r\n]+/g).forEach((vmInfo) => {
        const matches = vmInfo.match(/^"([^"]+)" {([^}]+)}/);

        if (matches === null)
        {
            console.error("Error: Unable to parse VM list.");
            process.exit(1);
        }

        let vmConfig;

        if (Object.keys(config.config).find(vm => vm === matches[2]))
        {
            vmConfig = config.config[matches[2]];
        }
        else
        {
            vmConfig = {};
        }

        vmList.push({
            name: matches[1],
            uuid: matches[2],
            config: vmConfig
        });
    });

    let t = new Table;

    vmList.forEach((vm, index) => {
        t.cell('VM#', index);
        t.cell('VM Name', vm.name);
        t.cell('UUID', vm.uuid);
        t.newRow();
    });

    return t.toString();
};

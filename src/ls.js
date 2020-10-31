/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const Table = require('tty-table');
const commands = require('./commands.js');

module.exports = (config) => {
    const vmList = [];

    commands.ls().split(/[\r\n]+/g).forEach((entry, index) => {
        const lsMatches = entry.match(/"([^"]+)" {([^}]+)}/);

        if (lsMatches === null) {
            console.error("Error: Unable to parse VM list.\n'%s'", entry);
            process.exit(1);
        }

        const name = lsMatches[1];
        const uuid = lsMatches[2];

        let state = null;
        commands.showvminfo(uuid).split(/[\r\n]+/g).forEach((vm) => {
            const vmMatches = vm.match(/^VMState="([^=]+)"$/);
            if (vmMatches !== null) {
                [, state] = vmMatches;
            }
        });

        vmList.push({
            vmNum: index.toString(10),
            name,
            uuid,
            state,
        });

        config.update(uuid, name);
    });

    const options = {
        borderColor: 'green',
        borderStyle: 'solid',
        color: 'white',
        align: 'left',
    };

    const header = [{
        value: 'vmNum',
        alias: 'VM#',
        align: 'left',
        headerAlign: 'left',
    }, {
        value: 'name',
        alias: 'VM Name',
        align: 'left',
        headerAlign: 'left',
    }, {
        value: 'uuid',
        alias: 'UUID',
        align: 'left',
        headerAlign: 'left',
    }, {
        value: 'state',
        alias: 'State',
        align: 'left',
        headerAlign: 'left',
    }];

    return `   Virtual Machine Listing${Table(header, vmList, options).render()}`;
};

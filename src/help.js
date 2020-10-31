/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */
const path = require('path');
const process = require('process');
const { titlecase } = require('stringcase');

const packageJson = require('../package.json');

module.exports = (argv, parameters) => {
    if (parameters.length === 0) {
    // Show package.json information
        console.log('%s %s', titlecase(packageJson.name), packageJson.version);

        console.group();

        // Show description
        console.log('%s\n', packageJson.description);

        // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s <command> [options [arguments]]\n', path.basename(argv[0]));
        console.groupEnd();

        // Show available commands.
        console.log('Available commands:');
        console.group();
        console.log('help      Display help text.');
        console.log('ls        List out available VMs.');
        console.log('set       Set VM configuration property.');
        console.log('shutdown  Shutdown a VM.');
        console.log('ssh       Connect to the VM via SSH.');
        console.log('start     Start a VM.');
        console.log('suspend   Save and suspend a VM.\n');
        console.groupEnd();

        console.log("Enter '%s help <command>' for help on that command.", path.basename(argv[0]));

        console.groupEnd();
    }

    if (parameters[0] === 'ls') {
    // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s ls\n', path.basename(argv[0]));
        console.groupEnd();

        // Show help description
        console.log('Help:');
        console.group();
        console.log('List out available VMs.');
        console.groupEnd();
    }

    if (parameters[0] === 'set') {
    // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s set <VM#> <property> [value]\n', path.basename(argv[0]));
        console.groupEnd();

        // Show usage information.
        console.log('Properties:');
        console.group();
        console.log('uuid     The unique identifier assigned to this VM by VirtualBox (immutable).');
        console.log('name     The name of the VM (immutable).');
        console.log('sshHost  The host IP for connecting this VM via SSH.');
        console.log('sshPort  The host port for connecting this VM via SSH.\n');
        console.groupEnd();

        // Show help description
        console.log('Help:');
        console.group();
        console.log('Set VM configuration property. If [value] is omitted, the current value will be printed.');
        console.log("The 'uuid' and 'name' property cannot be set.");
        console.groupEnd();
    }

    if (parameters[0] === 'shutdown') {
    // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s shutdown <VM#>\n', path.basename(argv[0]));
        console.groupEnd();

        // Show help description
        console.log('Help:');
        console.group();
        console.log('Shutdown a VM by sending the ACPI shutdown signal.');
        console.groupEnd();
    }

    if (parameters[0] === 'ssh') {
    // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s ssh <VM#> <username> [extra options and arguments ...]\n', path.basename(argv[0]));
        console.groupEnd();

        // Show help description
        console.log('Help:');
        console.group();
        console.log('Connect to the VM via SSH and login as <username>.');
        console.log('The sshHost and sshPort properties must be set prior to making a');
        console.log("connection. See 'help set' for more information.\n");
        console.groupEnd();

        // Show extra options and arguments help
        console.log('Extra Options and Arguments:');
        console.group();
        console.log('Extra options and arguments may be appended after <username>');
        console.log('e.g:');
        console.group();
        console.log('%s ssh 3 myuser -L 8080:localhost:80', path.basename(argv[0]));
        console.groupEnd();
        console.groupEnd();
    }

    if (parameters[0] === 'start') {
    // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s start <VM#>\n', path.basename(argv[0]));
        console.groupEnd();

        // Show help description
        console.log('Help:');
        console.group();
        console.log('Start a VM. If the VM is currently suspended, it will be resumed.');
        console.groupEnd();
    }

    if (parameters[0] === 'suspend') {
    // Show usage information.
        console.log('Usage:');
        console.group();
        console.log('%s suspend <VM#>\n', path.basename(argv[0]));
        console.groupEnd();

        // Show help description
        console.log('Help:');
        console.group();
        console.log('Save the current state of a VM and suspend it. The VM can');
        console.log("be resumed using the start command. See 'help start' for");
        console.log('more information.');
        console.groupEnd();
    }

    process.exit(0);
};

/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const path          = require("path"),
      process       = require("process");

const commands = require("./commands.js"),
      config   = require("./config.js")
      help     = require("./help.js"),
      ls       = require("./ls.js")
      ssh      = require("./ssh.js"),
      set      = require("./set.js");

// Process command line arguments and get only the basename
let cliArguments = [];
process.argv.forEach((argv) => {
    cliArguments.push(path.basename(argv));
});

// Show help
if (process.argv.length <= 2 || (process.argv.length >= 3 && process.argv[2] === "help"))
{
    let parameters = Array.from(process.argv);

    parameters.splice(0, 3);

    help(process.argv, parameters);

    process.exit(0);
}

// VM Listing
if (process.argv.length >= 3 && process.argv[2] == "ls")
{
    console.log(ls(config));
}

// Set VM properties
if (process.argv.length >= 3 && process.argv[2] == "set") {
    if (process.argv.length >= 4 && process.argv[3].match(/^[0-9]+$/g))
    {
        const vmNum = parseInt(process.argv[3], 10);

        if (config.config[vmNum])
        {
            let parameters = Array.from(process.argv);

            parameters.splice(0, 4);

            if (parameters[0])
            {
                set(config.config[vmNum], ...parameters);
            }
            else
            {
                help(process.argv, ["set"]);
            }
        }
    }
    else
    {
        help(process.argv, ["set"]);
    }
}

// Start VM
if (process.argv.length >= 3 && process.argv[2] == "start")
{
    if (process.argv.length >= 4 && process.argv[3].match(/^[0-9]+$/g))
    {
        const vmNum = parseInt(process.argv[3], 10);

        if (config.config[vmNum])
        {
            const start = commands.start(config.config[vmNum].uuid).trim();
            if (start)
            {
                console.log(start);
            }
        }
    }
    else
    {
        help(process.argv, ["start"]);
    }
}

// SSH VM
if (process.argv.length >= 3 && process.argv[2] == "ssh")
{
    if (process.argv.length >= 5 && process.argv[3].match(/^[0-9]+$/g) && process.argv[4])
    {
        const vmNum    = parseInt(process.argv[3], 10),
              username = process.argv[4],
              extraParameters = Array.from(process.argv);

        extraParameters.splice(0, 5);

        if (config.config[vmNum])
        {
            ssh(config.config[vmNum], username, extraParameters);
        }
    }
    else
    {
        help(process.argv, ["ssh"]);
    }
}


// Suspend VM
if (process.argv.length >= 3 && process.argv[2] == "suspend")
{
    if (process.argv.length >= 4 && process.argv[3].match(/^[0-9]+$/g))
    {
        const vmNum = parseInt(process.argv[3], 10);

        if (config.config[vmNum])
        {
            const suspend = commands.suspend(config.config[vmNum].uuid).trim();

            if (suspend)
            {
                console.log(suspend);
            }
        }
    }
    else
    {
        help(process.argv, ["suspend"]);
    }
}

// Shutdown VM
if (process.argv.length >= 3 && process.argv[2] == "shutdown")
{
    if (process.argv.length >= 4 && process.argv[3].match(/^[0-9]+$/g))
    {
        const vmNum = parseInt(process.argv[3], 10);

        if (config.config[vmNum])
        {
            const shutdown = commands.shutdown(config.config[vmNum].uuid).trim();

            if (shutdown)
            {
                console.log(shutdown);
            }
        }
    }
    else
    {
        help(process.argv, ["shutdown"]);
    }
}

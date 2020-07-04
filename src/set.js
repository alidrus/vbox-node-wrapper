/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const config = require("./config.js");

// Validate IP address
const isValidIP = (ipAddress) => {
    const octets = ipAddress.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)$/);

    if (octets === null)
    {
        return false;
    }

    let isValid = true;
    octets.forEach((octet) => {
        if (!isValid)
        {
            return;
        }

        if (parseInt(octet, 10) > 255)
        {
            isValid = false;
        }
    });

    return isValid;
}

// Validate port number
const isValidPort = (hostPort) => {
    const portNumber = parseInt(hostPort);

    return !isNaN(portNumber) && portNumber > 0 && portNumber <= 65535;
}

module.exports = (vmConfig, field, value = null) => {
    if (field == "sshHost")
    {
        if (typeof value == "string" && isValidIP(value))
        {
            config.update(vmConfig.uuid, null, value);
        }
        else if (value === null)
        {
            if (vmConfig[field])
            {
                console.log("%s: %s", field, vmConfig[field]);
            }
            else
            {
                console.log("%s is not set", field);
            }
        }
        else
        {
            console.error("ERROR: %s is not a valid IP address.", value);
        }
    }

    if (field == "sshPort")
    {
        if (typeof value == "string" && isValidPort(value))
        {
            config.update(vmConfig.uuid, null, null, value);
        }
        else if (value === null)
        {
            if (vmConfig[field])
            {
                console.log("%s: %s", field, vmConfig[field]);
            }
            else
            {
                console.log("%s is not set", field);
            }
        }
        else
        {
            console.error("ERROR: %s is not a valid SSH port.", value);
        }
    }

    if (field == "uuid" || field == "name")
    {
        if (vmConfig[field])
        {
            console.log("%s: %s", field, vmConfig[field]);
        }
        else
        {
            console.log("%s is not set", field);
        }
    }
};

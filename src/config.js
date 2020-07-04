/**
 * vim: syntax=javascript expandtab tabstop=4 shiftwidth=4 softtabstop=4:
 */

const process = require("process");
const fs      = require("fs");

class VBoxConfig {
    // Private fields
    #configFile;
    #configArray;

    constructor() {
        // Do not proceed if the HOME environment variable is not set.
        if (!process.env.HOME)
        {
            let error = new Error("HOME environment variable not found");

            error.name = "ERR_HOME_ENV_MISSING";

            throw error;
        }

        // Construct the full path of the config file.
        this.#configFile = process.env.HOME + "/.VBoxCLI.json";

        // Configuration file does not exist. Write a new one with an empty
        // JSON array.
        if (!fs.existsSync(this.#configFile))
        {
            fs.writeFileSync(this.#configFile, JSON.stringify([], null, 4), "utf8");
        }

        // Get config object from the config file
        this.#configArray = JSON.parse(fs.readFileSync(this.#configFile, "utf8"));

        // Invoke our config sanitizer.
        this.sanitizeConfig();
    }

    // Sanitize the configuration array and config gile
    sanitizeConfig() {
        if (!(this.#configArray instanceof Array))
        {
            // If configArray is not an array, then reset it to an empty array and
            // overwrite the config file.

            this.#configArray = [];

            fs.writeFileSync(this.#configFile, JSON.stringify(this.#configArray, null, 4), "utf8");

            return;
        }

        // Generate a new array of valid VM configurations.
        let validVMS = [];
        this.#configArray.forEach((vm, index) => {
            if (!vm.uuid || typeof vm.uuid !== "string") {
                return;
            }

            let vmObj = { uuid: vm.uuid };

            if (vm.name !== undefined && typeof vm.name === "string")
            {
                vmObj.name = vm.name;
            }

            if (vm.sshHost !== undefined && typeof vm.sshHost === "string")
            {
                vmObj.sshHost = vm.sshHost;
            }

            if (vm.sshPort !== undefined &&
                (typeof vm.sshPort === "number" || typeof vm.sshPort == "string"))
            {
                let numericPort = parseInt(vm.sshPort, 10);

                if (!isNaN(numericPort) && numericPort > 0 && numericPort <= 65535)
                {
                    vmObj.sshPort = numericPort;
                }
            }

            validVMS.push(vmObj);
        });

        // Replace config array with only the newly generated VM config.
        this.#configArray = validVMS;

        // Overwrite the config file with the valid configuration
        fs.writeFileSync(this.#configFile, JSON.stringify(this.#configArray, null, 4), "utf8");
    }

    get config() {
        return this.#configArray;
    }

    get configFile() {
        return this.#configFile;
    }

    update(uuid, name = null, sshHost = null, sshPort = null) {
        if (typeof uuid !== "string")
        {
            let error = new Error("HOME environment variable not found");

            error.name = "ERR_HOME_ENV_MISSING";

            throw error;
        }

        const index = this.#configArray.findIndex( vm => vm.uuid === uuid )

        if (index === -1)
        {
            let vmObj = {
                uuid
            };

            if (name !== null)
            {
                vmObj.name = name;
            }

            if (sshHost !== null)
            {
                vmObj.sshHost = sshHost;
            }

            if (sshPort !== null)
            {
                vmObj.sshPort = sshPort;
            }

            this.#configArray.push(vmObj);
        }
        else
        {
            this.#configArray[index].uuid = uuid;

            if (name !== null)
            {
                this.#configArray[index].name = name;
            }

            if (sshHost !== null)
            {
                this.#configArray[index].sshHost = sshHost;
            }

            if (sshPort !== null)
            {
                this.#configArray[index].sshPort = sshPort;
            }
        }

        this.sanitizeConfig();
    }
};

module.exports = new VBoxConfig;

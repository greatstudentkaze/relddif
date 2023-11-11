const fs = require('fs');

const fileName = 'store.json';

class ModuleService {
    static async create({ moduleName, localPath }) {
        const newStore = { ...await this.#getStore() };

        if (!newStore.modules) {
            newStore.modules = {};
        }

        newStore.modules[moduleName] = {
            "remotePrefix": `/static/resources/${moduleName}/`,
            "localPrefix": localPath,
            "enabled": true
        };

        return this.#updateStore(newStore);
    }
    static async update(moduleName, { localPath, enabled }) {
        const newStore = { ...await this.#getStore() };

        if (!newStore.modules?.hasOwnProperty(moduleName)) {
            throw new Error(`${moduleName} not found`);
        }

        if (localPath) {
            newStore.modules[moduleName].localPrefix = localPath;
        }

        if (typeof enabled === 'boolean') {
            newStore.modules[moduleName].enabled = enabled;
        }

        return this.#updateStore(newStore);
    }

    static async getAll() {
        const { modules } = await this.#getStore();

        return modules ?? {};
    }

    static async delete(moduleName) {
        const newStore = { ...await this.#getStore() };

        if (!newStore.modules.hasOwnProperty(moduleName)) {
            throw new Error(`${moduleName} not found`);
        }

        delete newStore.modules[moduleName];

        return this.#updateStore(newStore);
    }

    static #getStore() {
        return new Promise(function(resolve, reject) {
            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve(JSON.parse(data));
            });
        });
    }

    static #updateStore(newStore) {
        return new Promise(function(resolve, reject) {
            fs.writeFile(fileName, JSON.stringify(newStore, null, 2), function writeJSON(err) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve(JSON.parse(fs.readFileSync(fileName, 'utf8')).modules);
            });
        });
    }
}

module.exports = { ModuleService };

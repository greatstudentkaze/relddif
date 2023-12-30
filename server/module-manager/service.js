const { Store } = require('../store.js');

class ModuleService {
    static async create({ moduleName, localPath }) {
        const newStore = { ...await Store.get() };

        if (!newStore.modules) {
            newStore.modules = {};
        }

        let localPrefix = localPath;
        if (localPrefix.at(-1) !== '/') {
            localPrefix += '/';
        }

        newStore.modules[moduleName] = {
            "remotePrefix": `/static/resources/${moduleName}/`,
            "localPrefix": localPrefix,
            "enabled": true
        };

        const store = await Store.set(newStore);

        return store.modules;
    }
    static async update(moduleName, { localPath, enabled }) {
        const newStore = { ...await Store.get() };

        if (!newStore.modules?.hasOwnProperty(moduleName)) {
            throw new Error(`${moduleName} not found`);
        }

        if (localPath) {
            newStore.modules[moduleName].localPrefix = localPath;
        }

        if (typeof enabled === 'boolean') {
            newStore.modules[moduleName].enabled = enabled;
        }

        const store = await Store.set(newStore);

        return store.modules;
    }

    static async getAll() {
        const { modules } = await Store.get();

        return modules ?? {};
    }

    static async getByName(moduleName) {
        const modules = await this.getAll();
        if (!modules[moduleName]) {
            throw new Error(`${moduleName} not found`);
        }

        return modules[moduleName];
    }

    static async delete(moduleName) {
        const newStore = { ...await Store.get() };

        if (!newStore.modules.hasOwnProperty(moduleName)) {
            throw new Error(`${moduleName} not found`);
        }

        delete newStore.modules[moduleName];

        const store = await Store.set(newStore);

        return store.modules;
    }
}

module.exports = { ModuleService };

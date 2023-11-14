const { Store } = require('../store.js');

class HostService {
    static async create({ host }) {
        const newStore = { ...await Store.get() };

        if (!newStore.hosts) {
            newStore.hosts = {};
        }

        newStore.hosts[host] = {
            "origin": host,
            "enabled": true
        };

        const store = await Store.set(newStore);

        return store.hosts;
    }

    static async getAll() {
        const { hosts } = await Store.get();

        return hosts ?? {};
    }

    static async delete(host) {
        const newStore = { ...await Store.get() };

        if (!newStore.hosts.hasOwnProperty(host)) {
            throw new Error(`${host} not found`);
        }

        delete newStore.hosts[host];

        const store = await Store.set(newStore);

        return store.hosts;
    }
}

module.exports = { HostService };

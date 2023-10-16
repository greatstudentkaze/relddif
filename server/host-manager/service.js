const fs = require('fs');

const fileName = '../store.json';

class HostService {
    static async create({ host }) {
        const newStore = { ...await this.#getStore() };

        if (!newStore.hosts) {
            newStore.hosts = {};
        }

        newStore.hosts[host] = {
            "origin": host,
            "enabled": true
        };

        return this.#updateStore(newStore);
    }

    static async getAll() {
        const { hosts } = await this.#getStore();

        return hosts ?? {};
    }

    static async delete(host) {
        const newStore = { ...await this.#getStore() };

        if (!newStore.hosts.hasOwnProperty(host)) {
            throw new Error(`${host} not found`);
        }

        delete newStore.hosts[host];

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
        const self = this;

        return new Promise(function(resolve, reject) {
            fs.writeFile(fileName, JSON.stringify(newStore, null, 2), async (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve(await self.getAll());
            });
        });
    }
}

module.exports = { HostService };

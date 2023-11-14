const fs = require('fs');

const fileName = 'store.json';

class Store {
    static get() {
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

    static set(newStore) {
        return new Promise(function(resolve, reject) {
            fs.writeFile(fileName, JSON.stringify(newStore, null, 2), function writeJSON(err) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve(JSON.parse(fs.readFileSync(fileName, 'utf8')));
            });
        });
    }
}

module.exports = { Store };

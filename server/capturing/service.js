const { execSync, spawn } = require('child_process');
const fs = require('fs');

const PROXY_PORT = 1232;

const fileName = 'store.json';

class CapturingService {
    static #mitmdumpProcess = null;

    static #parseProxyState = (stateOutput) => {
        return stateOutput.split('\n')
            .reduce((result, string) => {
                if (!string) {
                    return result;
                }

                const [key, value] = string.split(': ');

                result[key] = value;

                return result;
            }, {});
    }

    static #isProxyEnabled = (proxyState) => {
        return proxyState.Enabled === 'Yes';
    }

    static getCapturingState = async () => {
        const adapter = await this.getSelectedNetworkService();
        const webProxyState = execSync(`networksetup -getwebproxy "${adapter}"`).toString();
        const secureWebProxyState = execSync(`networksetup -getsecurewebproxy "${adapter}"`).toString();

        const isWebProxyEnabled = this.#isProxyEnabled(this.#parseProxyState(webProxyState));
        const isSecureWebProxyEnabled = this.#isProxyEnabled(this.#parseProxyState(secureWebProxyState));
        const isProxyEnabled = isWebProxyEnabled && isSecureWebProxyEnabled;

        return {
            enabled: isProxyEnabled
        };
    }

    static #enableProxy = async () => {
        const adapter = await this.getSelectedNetworkService();
        execSync(`networksetup -setwebproxystate "${adapter}" on`);
        execSync(`networksetup -setwebproxy "${adapter}" localhost ${PROXY_PORT}`);
        execSync(`networksetup -setsecurewebproxystate "${adapter}" on`);
        execSync(`networksetup -setsecurewebproxy "${adapter}" localhost ${PROXY_PORT}`);
    }

    static #disableProxy = async () => {
        const adapter = await this.getSelectedNetworkService();
        execSync(`networksetup -setwebproxystate "${adapter}" off`);
        execSync(`networksetup -setsecurewebproxystate "${adapter}" off`);
    }

    static #enableMitmdump = async () => {
        const options = [
            '--script', './proxy.py',
            '--mode', `regular@${PROXY_PORT}`
        ];
        this.#mitmdumpProcess = spawn('mitmdump', options, {
            stdio: 'inherit'
        });

        const mitmProxyExited = new Promise((_, reject) => {
            this.#mitmdumpProcess.once('error', reject);
            this.#mitmdumpProcess.once('exit', reject);
        });

        // if (MITMProxy._activeProcesses.push(mitmProcess) === 1) {
        //     process.on('SIGINT', MITMProxy._cleanup);
        //     process.on('exit', MITMProxy._cleanup);
        // }
        // mp._initializeMITMProxy(mitmProcess);

        try {
            await mitmProxyExited;
        } catch (e) {

            this.#disableMitmdump();
            if (this.#mitmdumpProcess) {
            }

            if (e && typeof(e) === 'object' && e.code === "ENOENT") {
                console.log(`mitmdump, which is an executable that ships with mitmproxy, is not on your PATH. Please ensure that you can run mitmdump --version successfully from your command line.`)
            } else {
                console.log(`Unable to start mitmproxy: ${e}`);
            }
        }
    }

    static #disableMitmdump = () => {
        if (!this.#mitmdumpProcess) {
            console.log('ALREADY DISABLED');
            return;
        }

        this.#mitmdumpProcess.kill();
        this.#mitmdumpProcess = null;
    }

    static enable = async () => {
        await this.#enableProxy();
        await this.#enableMitmdump();
    }

    static disable = async () => {
        await this.#disableProxy();
        await this.#disableMitmdump();
    }

    static getAllNetworkServices = () => {
        const allNetworkServicesOutput = execSync('networksetup -listallnetworkservices').toString().split('\n');
        return allNetworkServicesOutput.slice(1, allNetworkServicesOutput.length - 1);
    }

    static setNetworkService = async (networkService) => {
        const allNetworkServices = this.getAllNetworkServices();
        if (!allNetworkServices.includes(networkService)) {
            throw new Error(`${networkService} not found`);
        }

        const { enabled } = await CapturingService.getCapturingState();
        if (enabled) {
            await this.disable();
        }

        const store = await this.#setSelectedNetworkServiceToStore(networkService);

        if (enabled) {
            await this.enable();
        }

        return store;
    }

    static getSelectedNetworkService = async () => {
        let store = { ...await this.#getStore() };
        const { networkService = '' } = store;

        const allNetworkServices = this.getAllNetworkServices();
        if (!allNetworkServices.includes(networkService)) {
            store = await this.#setSelectedNetworkServiceToStore('Wi-Fi');
        }

        return store.networkService;
    }

    static #setSelectedNetworkServiceToStore = async (networkService) => {
        let store = { ...await this.#getStore() };

        store.networkService = networkService;

        store = await this.#updateStore(store);

        return store;
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

module.exports = { CapturingService };

const { execSync, spawn } = require('child_process');
const fs = require('fs');

const PROXY_PORT = 1232;

const ADAPTER = 'Wi-Fi';

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

    static getCapturingState = () => {
        const webProxyState = execSync(`networksetup -getwebproxy "${ADAPTER}"`).toString();
        const secureWebProxyState = execSync(`networksetup -getsecurewebproxy "${ADAPTER}"`).toString();

        const isWebProxyEnabled = this.#isProxyEnabled(this.#parseProxyState(webProxyState));
        const isSecureWebProxyEnabled = this.#isProxyEnabled(this.#parseProxyState(secureWebProxyState));
        const isProxyEnabled = isWebProxyEnabled && isSecureWebProxyEnabled;

        return {
            enabled: isProxyEnabled
        };
    }

    static #enableProxy = () => {
        execSync(`networksetup -setwebproxystate "${ADAPTER}" on`);
        execSync(`networksetup -setwebproxy "${ADAPTER}" localhost ${PROXY_PORT}`);
        execSync(`networksetup -setsecurewebproxystate "${ADAPTER}" on`);
        execSync(`networksetup -setsecurewebproxy "${ADAPTER}" localhost ${PROXY_PORT}`);
    }

    static #disableProxy = () => {
        execSync(`networksetup -setwebproxystate "${ADAPTER}" off`);
        execSync(`networksetup -setsecurewebproxystate "${ADAPTER}" off`);
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

    static enable = () => {
        this.#enableProxy();
        this.#enableMitmdump();
    }

    static disable = () => {
        this.#disableProxy();
        this.#disableMitmdump();
    }
}

module.exports = { CapturingService };

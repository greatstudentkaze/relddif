// const userService = require('../service/user-service');
// const {validationResult} = require('express-validator');
// const ApiError = require('../exceptions/api-error');
const { CapturingService } = require('../capturing/service.js');
const { ModuleService } = require('../module-manager/service.js');
const { HostService } = require('../host-manager/service.js');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async enableModule(req, res, next) {
        try {
            const { moduleName, enabled } = req.body;

            const { enabled: isCapturingEnabled } = await CapturingService.getCapturingState();
            if (isCapturingEnabled) {
                await CapturingService.disable();
            }

            const modules = await ModuleService.update(moduleName, { enabled });

            if (isCapturingEnabled) {
                await CapturingService.enable();
            }

            return res.json(modules);
        } catch (e) {
            next(e);
        }
    }

    async addModule(req, res, next) {
        try {
            const { moduleName, localPath } = req.body;

            const modules = await ModuleService.create({ moduleName, localPath });

            return res.json(modules);
        } catch (e) {
            next(e);
        }
    }

    async deleteModule(req, res, next) {
        try {
            const { moduleName } = req.body;

            const modules = await ModuleService.delete(moduleName);

            return res.json(modules);
        } catch (e) {
            next(e);
        }
    }

    async updateModule(req, res, next) {
        try {
            const modules = await ModuleService.update(req.params.moduleName, req.body);

            return res.json(modules);
        } catch (e) {
            next(e);
        }
    }

    async modules(req, res, next) {
        try {
            const modules = await ModuleService.getAll();

            return res.json(modules);
        } catch (e) {
            next(e);
        }
    }

    async getModule(req, res, next) {
        try {
            const module = await ModuleService.getByName(req.params.moduleName);

            return res.json(module);
        } catch (e) {
            next(e);
        }
    }

    async getAllHosts(req, res, next) {
        try {
            return res.json(await HostService.getAll());
        } catch (e) {
            next(e);
        }
    }

    async createHost(req, res, next) {
        try {
            const { host } = req.body;

            return res.json(await HostService.create({ host }));
        } catch (e) {
            next(e);
        }
    }

    async deleteHost(req, res, next) {
        try {
            return res.json(await HostService.delete(req.params.host));
        } catch (e) {
            next(e);
        }
    }

    async toggleHostState(req, res, next) {
        try {
            const { host, enabled } = req.body;

            const { enabled: isCapturingEnabled } = await CapturingService.getCapturingState();
            if (isCapturingEnabled) {
                await CapturingService.disable();
            }

            const hosts = await HostService.update(host, { enabled });

            if (isCapturingEnabled) {
                await CapturingService.enable();
            }

            return res.json(hosts);
        } catch (e) {
            next(e);
        }
    }

    async getCapturingState(req, res, next) {
        try {
            const capturingState = await CapturingService.getCapturingState();

            return res.json(capturingState);
        } catch (e) {
            next(e);
        }
    }

    async getAllNetworkServices(req, res, next) {
        try {
            const allNetworkServices = CapturingService.getAllNetworkServices();
            const selectedNetworkService = await CapturingService.getSelectedNetworkService();

            return res.json({
                selected: selectedNetworkService,
                items: allNetworkServices
            });
        } catch (e) {
            next(e);
        }
    }

    async setNetworkService(req, res, next) {
        try {
            await CapturingService.setNetworkService(req.body.name);

            return res.json();
        } catch (e) {
            next(e);
        }
    }

    async updateCapturingState(req, res, next) {
        try {
            const { command } = req.body;

            if (command === 'enable') {
                CapturingService.enable();
            } else if (command === 'disable') {
                CapturingService.disable();
            } else {
                res.status(400).send('wrong command');
            }

            return res.json();
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();

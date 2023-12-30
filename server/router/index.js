const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
// const {body} = require('express-validator');
// const authMiddleware = require('../middlewares/auth-middleware');

// router.post('/registration',
//     body('email').isEmail(),
//     body('password').isLength({min: 3, max: 32}),
//     userController.registration
// );
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
router.get('/modules', userController.modules);
router.get('/modules/:moduleName', userController.getModule);
router.post('/modules/enable', userController.enableModule);
router.post('/modules', userController.addModule);
router.delete('/modules', userController.deleteModule);
router.patch('/modules/:moduleName', userController.updateModule);
router.get('/capturing', userController.getCapturingState);
router.post('/capturing', userController.updateCapturingState);
router.get('/network-services', userController.getAllNetworkServices);
router.post('/network-services', userController.setNetworkService);
router.get('/hosts', userController.getAllHosts);
router.post('/hosts', userController.createHost);
router.post('/hosts/toggle', userController.toggleHostState);
router.delete('/hosts/:host', userController.deleteHost);

module.exports = router

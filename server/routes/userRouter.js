const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.put('/', authMiddleware, userController.update);
router.get('/auth', authMiddleware, userController.check);
router.get('/:id', userController.getOne);
router.get('/', checkRole('BEATMAKER'), userController.getBalance);
router.post('/moneyRequest', checkRole('BEATMAKER'), userController.createMoneyRequest);

module.exports = router;
const Router = require('express');
const licenseController = require('../controllers/licenseController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('BEATMAKER'), licenseController.update);
router.get('/', licenseController.getAll);
router.get('/:id', licenseController.getOne);

module.exports = router;
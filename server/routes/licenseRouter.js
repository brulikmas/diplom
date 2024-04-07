const Router = require('express');
const licenseController = require('../controllers/licenseController');
const router = new Router();

router.post('/', licenseController.update);
router.get('/', licenseController.getAll);
router.get('/:id', licenseController.getOne);

module.exports = router;
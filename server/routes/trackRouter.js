const Router = require('express');
const trackController = require('../controllers/trackController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('BEATMAKER'), trackController.create);
router.get('/', trackController.getAll);
router.get('/:id', trackController.getOne);
router.delete('/:id',  checkRole('BEATMAKER'), trackController.delete);

module.exports = router;
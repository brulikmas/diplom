const Router = require('express');
const trackController = require('../controllers/trackController');
const router = new Router();

router.post('/', trackController.create);
router.get('/', trackController.getAll);
router.get('/:id', trackController.getOne);
router.delete('/:id', trackController.delete);

module.exports = router;
const Router = require('express');
const trackController = require('../controllers/trackController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRole('BEATMAKER'), trackController.create);
router.put('/', checkRole('BEATMAKER'), trackController.update);
router.get('/', trackController.getAll);
router.get('/download/', authMiddleware, trackController.downloadFile);
router.get('/:id', trackController.getOne);
router.get('/withAuth/:id', checkRole('BEATMAKER'),  trackController.getOneWithAuth);
router.delete('/',  checkRole('BEATMAKER'), trackController.delete);

module.exports = router;
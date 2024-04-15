const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const BasketTrackLicenseController = require('../controllers/basketTrackLicenseController');

router.post('/', authMiddleware, BasketTrackLicenseController.create);
router.get('/', authMiddleware, BasketTrackLicenseController.getAll);
router.delete('/', authMiddleware, BasketTrackLicenseController.delete);

module.exports = router;
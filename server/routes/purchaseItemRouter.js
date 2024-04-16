const Router = require('express');
const PurchaseItemController = require('../controllers/purchaseItemController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, PurchaseItemController.create);
router.get('/', authMiddleware, PurchaseItemController.getAll);

module.exports = router;
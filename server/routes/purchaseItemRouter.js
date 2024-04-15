const Router = require('express');
const PurchaseItemController = require('../controllers/purchaseItemController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, PurchaseItemController.create);
router.get('/', authMiddleware, PurchaseItemController.getAll);
//router.get('/:id', authMiddleware, PurchaseItemController.getOne);

module.exports = router;
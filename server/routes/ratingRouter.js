const Router = require('express');
const RatingController = require('../controllers/ratingController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, RatingController.create);
router.delete('/', authMiddleware, RatingController.delete);
router.get('/:id', authMiddleware, RatingController.getOne);

module.exports = router;
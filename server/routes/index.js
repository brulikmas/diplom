const Router = require('express');
const userRouter = require('./userRouter');
const trackRouter = require('./trackRouter');
const licenseRouter = require('./licenseRouter');
const router = new Router();


router.use('/user', userRouter);
router.use('/track', trackRouter);
router.use('/license', licenseRouter);


module.exports = router;
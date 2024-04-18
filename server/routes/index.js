const Router = require('express');
const userRouter = require('./userRouter');
const trackRouter = require('./trackRouter');
const licenseRouter = require('./licenseRouter');
const purchaseItemRouter = require('./purchaseItemRouter');
const bascketTrackLicenseRouter = require('./basketTrackLicenseRouter');
const ratingRouter = require('./ratingRouter');
const router = new Router();


router.use('/user', userRouter);
router.use('/track', trackRouter);
router.use('/license', licenseRouter);
router.use('/purchaseItem', purchaseItemRouter);
router.use('/basketTrackLicense', bascketTrackLicenseRouter);
router.use('/rating', ratingRouter);

module.exports = router;
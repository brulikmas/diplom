const { License, AvailableFile, TrackLicense, PurchaseItem, BasketTrackLicense, Track, User, File} = require('../models/models');
const ApiError = require('../error/ApiError');

//Заглушка для покупки трека, в будущем следует подключить платежный сервис
class PurchaseItemController {
  async create(req, res, next) {
    try {
      const { trackLicense, beatmakerId, basketId } = req.body;
      const purchaseItem = await PurchaseItem.create({ userId: req.user.id, trackLicenseId: trackLicense.id });
      await BasketTrackLicense.destroy({ where: { basketId, trackLicenseId: trackLicense.id }});
      let findedBeatmaker = await User.findOne({ where: { id: beatmakerId } });
      findedBeatmaker.balance += trackLicense.custom_price;
      await User.update({ balance: findedBeatmaker.balance }, { where: { id: beatmakerId }});

      return res.json(purchaseItem);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 7;
      let offset = page * limit - limit;
      let purchaseItems = await PurchaseItem.findAndCountAll({
        where: { userId: req.user.id },
        limit,
        offset,
      });
      let newPurchaseItems = { count: purchaseItems.count, rows: [] };

      for (let purchaseItem of purchaseItems.rows) {
        let trackLicense = await TrackLicense.findOne({ where: { id: purchaseItem.trackLicenseId }});
        let license = await License.findOne({ 
          where: { id: trackLicense.licenseId },
          include: [{ model: AvailableFile, as: 'availableFiles' }],
        });
        let track = await Track.findOne({ where: { id: trackLicense.trackId }, include: [{ model: File, as: 'files' }]});
        let beatmaker = await User.findOne({ where: { id: license.userId } });

        let availableFilesInTrack = [];

        track.files.forEach(file => {
          if (license.availableFiles.find(v => v.file_type === file.type)) {
            availableFilesInTrack.push(file);
          }
        });
        
        let writableTrack = {...track};
        writableTrack.files = availableFilesInTrack;

        console.log(writableTrack)


        newPurchaseItems.rows.push({
          id: purchaseItem.id,
          userId: req.user.id,
          trackLicense,
          track: writableTrack,
          license,
          beatmaker: {
            id: beatmaker.id,
            nickname: beatmaker.nickname,
          }
        });
      }

      return res.json(newPurchaseItems);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PurchaseItemController();
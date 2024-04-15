const { License, AvailableFile, TrackLicense, PurchaseItem } = require('../models/models');
const ApiError = require('../error/ApiError');

//Заглушка для покупки трека, в будущем следует подключить платежный сервис
class PurchaseItemController {
  async create(req, res, next) {
    try {
      const { trackLicenseId } = req.body;
      const purchaseItem = await PurchaseItem.create({ userId: req.user.id, trackLicenseId });

      return res.json(purchaseItem);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    const { limit, page } = req.query;
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let purchaseItems = await PurchaseItem.findAndCountAll({
      where: { userId: req.user.id },
      limit,
      offset,
    });

    purchaseItems.rows.map(v => {

    })
  }
}

module.exports = new PurchaseItemController();
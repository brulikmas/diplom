const { License, AvailableFile, TrackLicense, BasketTrackLicense, Basket } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketTrackLicenseController {
  async create(req, res, next) {
    try {
      const { trackLicense } = req.body;
      const userBasket = await Basket.findOne({ 
        where: { userId: req.user.id },
        include: [{ model: BasketTrackLicense, as: 'basketTrackLicenses'}]
      });
      let hasThisTrack = false;
      let basketTrackLicense;
      let previousId;

      for (let basketTl of userBasket.basketTrackLicenses) {
        let currentTrackLicense = await TrackLicense.findOne({ where: { id: basketTl.trackLicenseId } });

        if (currentTrackLicense.trackId === trackLicense.trackId) {
          hasThisTrack = true;
          previousId = basketTl.id;
          break;
        }
      }

      if (hasThisTrack) {
        await BasketTrackLicense.update(
          { trackLicenseId: trackLicense.id},
          { where: { id: previousId } },
        );
        basketTrackLicense = await BasketTrackLicense.findOne({ where: { id: previousId } });
      } else {
        basketTrackLicense = await BasketTrackLicense.create({ 
          trackLicenseId: trackLicense.id, 
          userId: req.user.id,
          basketId: userBasket.id,
        });
      }

      return res.json(basketTrackLicense);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    const userBasket = await Basket.findOne({ where: { userId: req.user.id } });
    let basketTrackLicenses = await BasketTrackLicense.findAll({
      where: { basketId: userBasket.id },
    });
  }

  async delete(req, res, next) {
    try {
      const { id } = req.query;
      await BasketTrackLicense.destroy({ where: { id }});
      
      return res.json({ message: 'Лицензия удалена из корзины.'})
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketTrackLicenseController();
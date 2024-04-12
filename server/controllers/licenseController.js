const { License, AvailableFile, TrackLicense } = require('../models/models');
const ApiError = require('../error/ApiError');
class LicenseController {
  async update(req, res, next) {
    try {
      const { 
        id, 
        type,
        name, 
        price, 
        count_streams,
        count_copies,
        count_video_streams,
        count_performances,
        availableFiles,
      } = req.body;
      let newLicense;
  
      const currentLicense = await License.findOne({
        where: { id },
        include: [
          { model: TrackLicense, as: "trackLicenses" },
          { model: AvailableFile, as: "availableFiles"},
        ],
      });
  
      if (currentLicense.trackLicenses.length === 0) {
        newLicense = await License.update(
          {
            name,
            price,
            count_streams,
            count_copies,
            count_video_streams,
            count_performances,
          },
          {
            where: { id }
          }
        );
        
        if (availableFiles.length >= currentLicense.availableFiles.length) {
          availableFiles.forEach(v => {
            if (!currentLicense.availableFiles.find(af => af.file_type === v.file_type)) {
              AvailableFile.create({ licenseId: id, file_type: v.file_type });
            }
          });
        } else {
          currentLicense.availableFiles.forEach(v => {
            if (!availableFiles.find(af => af.file_type === v.file_type)) {
              AvailableFile.destroy({ where: { id: v.id } });
            }
          })
        }

        newLicense = await License.findOne({ where: { id } });
      } else {
        License.update({ is_visible: false }, { where: { id } });
  
        newLicense = await License.create(
          {
            userId: req.user.id,
            type,
            name, 
            price,
            count_streams,
            count_copies,
            count_video_streams,
            count_performances,
          },
        );
  
        currentLicense.trackLicenses.forEach(trackLicense => {
          TrackLicense.update({ is_visible: false }, { where: { id: trackLicense.id } });
          //Возможно, в будущем сделать обработку на то, имеется ли покупка для данной трек-лицензии,
          //чтобы не создавать множество лишних записей.
          TrackLicense.create({ 
            licenseId: newLicense.id, 
            trackId: trackLicense.trackId, 
            custom_price: trackLicense.custom_price,
          })
        });
  
        availableFiles.forEach(v => {
          AvailableFile.create({ licenseId: newLicense.id, file_type: v.file_type });
        });
      }
  
      return res.json(newLicense);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { userId } = req.query;
    const licenses = await License.findAll({ 
      where: { userId, is_visible: true },
      include: [{ model: AvailableFile, as: "availableFiles" }],
    });
    return res.json(licenses);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const license = await License.findOne({
      where: { id },
      include: [{ model: AvailableFile, as: "availableFiles" }],
    });
    return res.json(license);
  }
}

module.exports = new LicenseController();
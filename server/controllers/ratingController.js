const { Rating, Track, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
  async create(req, res, next) {
    try {
      const { trackId } = req.body;
      const rating = await Rating.create({ trackId, userId: req.user.id });
      const track = await Track.findOne({ where: { id: trackId }});
      await Track.update({ rating: track.rating + 1 }, { where: { id: trackId }});
      
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
  async delete(req, res, next) {
    try {
      const { trackId } = req.query;
      await Rating.destroy({ where: { trackId, userId: req.user.id } });
      const track = await Track.findOne({ where: { id: trackId }});
      await Track.update({ rating: track.rating - 1 }, { where: { id: trackId }});

      return res.json({ message: 'Оценка удалена'});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RatingController();
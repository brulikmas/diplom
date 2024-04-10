const uuid = require('uuid');
const path = require('path');
const { Track } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize')
class TrackController {
  async create(req, res, next) {
    try {
      const { name, bpm, tonality, genre, mood, description } = req.body;
      const { icon } = req.files;
      let iconName = uuid.v4() + '.jpeg';
      icon.mv(path.resolve(__dirname, '..', 'static', iconName));
  
      const track = await Track.create({ userId: req.user.id, name, bpm, tonality, genre, mood, description, icon: iconName });

      return res.json(track);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //Получаем все треки с фильтрацией и пагинацией
  async getAll(req, res, next) {
    try {
      let { userId, name, bpm, tonality, genre, mood, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let whereConditions = {};
      let tracks;
      
      if (bpm) {
        whereConditions.bpm = bpm;
      }

      if (tonality) {
        whereConditions.tonality = tonality;
      }

      if (genre) {
        whereConditions.genre = genre;
      }

      if (mood) {
        whereConditions.mood = mood;
      }

      if (name) {
        whereConditions.name = {
          [Op.substring]: name,
        }
      }
  
      if (!userId) {
        //findAndCountAll выводит количество треков, которые удовлетворяют фильтрации
        //также возвращает только те строки в поле rows, которые соответствуют limit и page 
        tracks = await Track.findAndCountAll({
          where: whereConditions,
          limit, 
          offset 
        });
      }
  
      if (userId) {
        tracks = await Track.findAndCountAll({ where: { userId }, limit, offset });
      }
  
      return res.json(tracks);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {

  }

  async delete(req, res) {

  }
}

module.exports = new TrackController();
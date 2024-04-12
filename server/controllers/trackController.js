const uuid = require('uuid');
const path = require('path');
const { Track, File, TrackLicense } = require('../models/models');
const ApiError = require('../error/ApiError');
const fs = require('fs');
const { Op } = require('sequelize');
class TrackController {
  async create(req, res, next) {
    try {
      let { name, bpm, tonality, genre, mood, description, trackLicenses } = req.body;
      const { icon, mp3tag, mp3, wav, trackout } = req.files;
      const files = [
        {
          type: 'mp3',
          file: mp3,
        },
        {
          type: 'wav',
          file: wav,
        },
        {
          type: 'trackout',
          file: trackout
        }
      ];
      let iconName = uuid.v4() + '.jpeg';
      let mp3tagName = uuid.v4() + '.mp3';
      icon?.mv(path.resolve(__dirname, '..', 'static', iconName));
      mp3tag.mv(path.resolve(__dirname, '..', 'static', mp3tagName));

      const track = await Track.create({ 
        userId: req.user.id, 
        name, 
        bpm, 
        tonality, 
        genre, 
        mood, 
        description, 
        icon: iconName,
        mp3tag: mp3tagName,
      });

      if (trackLicenses) {
        trackLicenses = JSON.parse(trackLicenses);
        trackLicenses.forEach(tl => {
          TrackLicense.create({
            licenseId: tl.licenseId,
            trackId: track.id,
            custom_price: tl.custom_price,
          })
        });
      }

      let dirPath = process.env.FILE_PATH + `\\${req.user.id}\\${track.id}`
      fs.mkdirSync(dirPath);

      files.forEach(v => {
        let path = dirPath + `\\${v.file.name}`;
        v.file?.mv(path);
        File.create({ trackId: track.id, type: v.type, path })
      });


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
const uuid = require('uuid');
const path = require('path');
const { Track, File, TrackLicense, PurchaseItem } = require('../models/models');
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
      let whereConditions = { is_visible: true };
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
          offset,
          include: [{ 
            model: TrackLicense, 
            as: "trackLicenses",
            where: { is_visible: true },
          }],
          distinct: true
        });
      }
  
      if (userId) {
        tracks = await Track.findAndCountAll({ 
          where: { userId, is_visible: true }, 
          limit, 
          offset,
          include: [{ 
            model: TrackLicense, 
            as: "trackLicenses",
            where: { is_visible: true },
          }],
          distinct:true
        });
      }
  
      return res.json(tracks);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const track = await Track.findOne({ 
      where: { id, is_visible: true },
      include: [{ model: TrackLicense, as: "trackLicenses", where: { is_visible: true } }],
    });
    return res.json(track);
  }

  async getOneWithAuth(req, res, next) {
    try {
      const { id } = req.params;
      const track = await Track.findOne({ 
        where: { id, is_visible: true },
        include: [
          { model: TrackLicense, as: "trackLicenses", where: { is_visible: true } },
          { model: File, as: "files" },
        ],
      });

      if (req.user.id === track.userId) {
        return res.json(track);
      } else {
        next(ApiError.forbidden('Нет доступа.'));
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.query;
      const track = await Track.findOne({ 
        where: { id },
        include: [
          { 
            model: TrackLicense, 
            as: "trackLicenses",
            include: [{model: PurchaseItem, as: "purchaseItems" }],
          },
          { model: File, as: "files" },
        ],
      });

      if (req.user.id === track.userId) {
        let hasPurchaseItems = false;
        let filesPath = process.env.FILE_PATH + `\\${req.user.id}\\${track.id}`;

        track.trackLicenses.forEach(tl => {
          if (tl.purchaseItems.length === 0) {
            TrackLicense.destroy({ where: { id: tl.id } });
          } else {
            TrackLicense.update({ is_visible: false }, { where: { id: tl.id } });
            hasPurchaseItems = true;
          }
        });

        //Полное удаления трека, если нет покупок по его трек-лицензиям
        if (!hasPurchaseItems) {
          fs.rmSync(filesPath, { recursive: true, force: true });

          track.files.forEach(f => File.destroy({ where: {id: f.id } }));
          await Track.destroy({ where: { id: track.id } });
        } else {
          //Скрываем трек, если по его трек-лицензиям есть покупки
          await Track.update({ is_visible: false }, { where: { id: track.id } });
        }
        return res.json({ message: 'Бит удален.'});
      } else {
        next(ApiError.forbidden('Нет доступа.'));
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      let { id, name, bpm, tonality, genre, mood, description, trackLicenses } = req.body;
      const { icon, mp3tag, mp3, wav, trackout } = req.files || {};
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
      mp3tag?.mv(path.resolve(__dirname, '..', 'static', mp3tagName));

      const track = await Track.findOne({ 
        where: { id },
        include: [
          { 
            model: TrackLicense, 
            as: "trackLicenses",
            include: [{model: PurchaseItem, as: "purchaseItems" }],
            where: { is_visible: true },
          },
          { model: File, as: "files" },
        ],
      });

      if (req.user.id === track.userId) {
        await Track.update(
          { 
            name,
            bpm,
            tonality,
            genre,
            mood,
            description,
            icon: icon ? iconName : track.icon,
            mp3tag: mp3tag ? mp3tagName : track.mp3tag,
          },
          { where: { id } }
        );

        trackLicenses = JSON.parse(trackLicenses);
        trackLicenses.forEach(tl => {
          const findedTl = track.trackLicenses.find(v => v.id === tl.id);
          
          if (tl.custom_price !== findedTl.custom_price) {
            if (findedTl.purchaseItems.length !== 0) {
              TrackLicense.update( { is_visible: false }, { where: { id: tl.id } });
              TrackLicense.create({
                licenseId: tl.licenseId,
                trackId: tl.trackId,
                custom_price: tl.custom_price,
              });
            } else {
              TrackLicense.update( { custom_price: tl.custom_price }, { where: { id: tl.id } });
            }
          }
        });

        let dirPath = process.env.FILE_PATH + `\\${req.user.id}\\${track.id}`
  
        for (let v of files) {
          if (v.file) {
            let path = dirPath + `\\${v.file.name}`;
            let previosFile = await File.findOne({ where: { trackId: track.id, type: v.type } });

            fs.unlinkSync(previosFile.path);
            File.destroy({ where: { trackId: track.id, type: v.type } });
            v.file?.mv(path);
            File.create({ trackId: track.id, type: v.type, path });
          }
        }

        return res.json(track);
      } else {
        next(ApiError.forbidden('Нет доступа.'));
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TrackController();
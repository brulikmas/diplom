const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const { User, Basket, License, AvailableFile } = require('../models/models');
const fileTypes = ['mp3', 'wav', 'trackout'];
const licenses = [
  {
    type: 'base',
    name: 'Базовая лицензия',
    price: 1000,
    count_streams: 50000,
    count_copies: 5000,
    count_video_streams: 10000,
    count_performances: 5,
  },
  {
    type: 'premium',
    name: 'Премиум лицензия',
    price: 3000,
    count_streams: 200000,
    count_copies: 15000,
    count_video_streams: 150000,
    count_performances: 10,
  },
  {
    type: 'exclusive',
    name: 'Эксклюзивная лицензия',
    price: 5000,
    count_streams: 999999999999,
    count_copies: 999999999999,
    count_video_streams: 999999999999,
    count_performances: 999999999999,
  }
]

const generateJwt = (id, email, nickname, role) => {
  return jwt.sign(
    { id, email, nickname, role }, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'},
  );
};
class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, nickname, role } = req.body;
      
      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или пароль.'));
      }
  
      const condidateEmail = await User.findOne({ where: { email }});
  
      if (condidateEmail) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует.'));
      }

      const condidateNickname = await User.findOne({ where: { nickname }});
  
      if (condidateNickname) {
        return next(ApiError.badRequest('Пользователь с таким никнеймом уже существует.'));
      }
  
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, nickname, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      
      for (let license of licenses) {
        const createdLicense = await License.create({
          userId: user.id,
          type: license.type,
          name: license.name,
          price: license.price,
          count_streams: license.count_streams,
          count_copies: license.count_copies,
          count_video_streams: license.count_video_streams,
          count_performances: license.count_performances,
        });
  
        if (license.type !== 'base') {
          fileTypes.forEach(type => {
            AvailableFile.create({ licenseId: createdLicense.id, file_type: type });
          });
        } else {
          AvailableFile.create({ licenseId: createdLicense.id, file_type: 'mp3' });
        }
      }
  
      const token = generateJwt(user.id, user.email, user.nickname, user.role);
      fs.mkdirSync(process.env.FILE_PATH + `\\${user.id}`);
      return res.json({token});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }});
  
      if (!user) {
        return next(ApiError.internal('Пользователь не найден.'));
      }
  
      let comparePassword = bcrypt.compareSync(password, user.password);
  
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль.'));
      }
  
      const token = generateJwt(user.id, user.email, user.nickname, user.role);
  
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.nickname, req.user.role);
    return res.json({ token });
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      let user = await User.findOne({ where: { id } });
      return res.json({
        id: user.id,
        nickname: user.nickname,
        name: user.name,
        surname: user.surname,
        country: user.country,
        avatar: user.avatar,
        info: user.info
      })
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getBalance(req, res, next) {
    try {
      let user = await User.findOne({ where: { id: req.user.id } });
      return res.json({ balance: user.balance });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { name, surname, country, info, nickname } = req.body;
      const { avatar } = req.files;
      
      let avatarName = uuid.v4() + '.jpeg';
      avatar?.mv(path.resolve(__dirname, '..', 'static', avatarName));

      const previousUser = await User.findOne({ where: { id: req.user.id } });
      await User.update(
        { 
          name,
          surname,
          country,
          info,
          nickname,
          avatar: avatar ? avatarName : previousUser.avatar,
        },
        { where: { id: req.user.id } }
      )

      return res.json('Информация о пользователе обновлена');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
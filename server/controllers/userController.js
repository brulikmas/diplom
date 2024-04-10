const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket, License, AvailableFile } = require('../models/models');
const fileTypes = ['mp3', 'wav', 'trackout'];
const licenses = [
  {
    type: 'base',
    name: 'Базовая лицензия',
  },
  {
    type: 'premium',
    name: 'Премиум лицензия',
  },
  {
    type: 'exclusive',
    name: 'Эксклюзивная лицензия',
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
        return next(ApiError.badRequest('Некорректный email или пароль'));
      }
  
      const condidateEmail = await User.findOne({ where: { email }});
  
      if (condidateEmail) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      const condidateNickname = await User.findOne({ where: { nickname }});
  
      if (condidateNickname) {
        return next(ApiError.badRequest('Пользователь с таким никнеймом уже существует'));
      }
  
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, nickname, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      
      for (let license of licenses) {
        const createdLicense = await License.create({
          userId: user.id,
          type: license.type,
          name: license.name,
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
}

module.exports = new UserController();
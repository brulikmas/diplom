const ApiError = require('../error/ApiError');
//Создание первых лицензий можно занести сюда, создав функцию
//и импортировав License и AvailableFiles
class UserController {
  async registration(req, res) {

  }

  async login(req, res, next) {

  }

  async check(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return next(ApiError.badRequest('Не задан Id'))
    }

    res.json(id)
  }
}

module.exports = new UserController();
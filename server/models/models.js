const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  balance: { type: DataTypes.INTEGER, defaultValue: 0 },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  avatar: { type: DataTypes.STRING },
  info: { type: DataTypes.STRING },
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketTrackLicense = sequelize.define('basket_track_license', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Track = sequelize.define('track', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  bpm: { type: DataTypes.INTEGER, allowNull: false },
  tonality: { type: DataTypes.STRING },
  genre: { type: DataTypes.STRING, allowNull: false },
  mood: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const File = sequelize.define('file', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  path: { type: DataTypes.STRING, allowNull: false},
});

const License = sequelize.define('license', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, defaultValue: 1000, allowNull: false },
  count_streams: { type: DataTypes.INTEGER, defaultValue: 50000, allowNull: false },
  count_copies: { type: DataTypes.INTEGER, defaultValue: 5000, allowNull: false },
  count_video_streams: { type: DataTypes.INTEGER, defaultValue: 10000, allowNull: false },
  count_performances: { type: DataTypes.INTEGER, defaultValue: 5, allowNull: false },
  is_visible: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false }
});

const AvailableFile = sequelize.define('available_file', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  file_type: { type: DataTypes.STRING, allowNull: false },
});

const TrackLicense = sequelize.define('track_license', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  custom_price: { type: DataTypes.INTEGER, defaultValue: 2000 },
  is_visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, },
});

const PurchaseItem = sequelize.define('purchase_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Track);
Track.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(PurchaseItem);
PurchaseItem.belongsTo(User);

User.hasMany(License);
License.belongsTo(User);

Track.hasMany(Rating);
Rating.belongsTo(Track);

Track.hasMany(File);
File.belongsTo(Track);

Track.hasMany(TrackLicense);
TrackLicense.belongsTo(Track);

License.hasMany(AvailableFile, { as: 'availableFiles' });
AvailableFile.belongsTo(License);

License.hasMany(TrackLicense);
TrackLicense.belongsTo(License);

Basket.hasMany(BasketTrackLicense);
BasketTrackLicense.belongsTo(Basket);

TrackLicense.hasMany(BasketTrackLicense);
BasketTrackLicense.belongsTo(TrackLicense);

TrackLicense.hasMany(PurchaseItem);
PurchaseItem.belongsTo(TrackLicense);

module.exports = {
  User,
  Basket,
  BasketTrackLicense,
  Track,
  Rating,
  File,
  License,
  AvailableFile,
  TrackLicense,
  PurchaseItem
}
const md5 = require('md5');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class User extends Model { }
User.init({
  email: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
    set(value) {
      this.setDataValue('password', md5(value));
    },
  },
  fullName: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
  photoProfile: { allowNull: true, type: DataTypes.TEXT },
  phoneNumber: { allowNull: true, type: DataTypes.STRING },
  idCardNumber: { allowNull: true, type: DataTypes.STRING },
  gender: { allowNull: false, type: DataTypes.ENUM(['pria', 'perempuan']), defaultValue: 'pria' },
  bornDate: { allowNull: true, type: DataTypes.STRING },
  bornPlace: { allowNull: true, type: DataTypes.STRING },
  address: { allowNull: true, type: DataTypes.TEXT },
  rw: { allowNull: true, type: DataTypes.STRING },
  rt: { allowNull: true, type: DataTypes.STRING },
  kelurahan: { allowNull: true, type: DataTypes.STRING },
  kecamatan: { allowNull: true, type: DataTypes.STRING },
  category: { allowNull: false, type: DataTypes.ENUM(['penjual', 'pembeli']), defaultValue: 'pembeli' },
  apiToken: {
    allowNull: true,
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('password', md5(value));
    },
  },
  lastLogin: { allowNull: true, type: DataTypes.DATE },
}, {
  sequelize,
  tableName: 'users',
});

module.exports = User;

const sequelize = require('../../config/sequelize')
const { Sequelize, DataTypes } = require('sequelize');

const Products = sequelize.define('Products', {
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT
  }
}, {
  // Other model options go here
});

module.exports = Products;
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    'Contacts',
    {
      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carrigeMenu: DataTypes.TEXT,
      deliverooMenu: DataTypes.TEXT,
      instagram: DataTypes.STRING,
      menusite: DataTypes.TEXT,
      phone: DataTypes.STRING,
      talabatMenu: DataTypes.TEXT,
      website: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {}
  );
  Contacts.associate = function (models) {};
  return Contacts;
};

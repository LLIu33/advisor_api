'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    'Contacts',
    {
      placeId: DataTypes.INTEGER,
      carrigeMenu: DataTypes.TEXT,
      deliverooMenu: DataTypes.TEXT,
      instagram: DataTypes.STRING,
      menusite: DataTypes.TEXT,
      phone: DataTypes.STRING,
      talabatMenu: DataTypes.TEXT,
      website: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
    },
    {}
  );
  Contacts.associate = function (models) {
    // associations can be defined here
  };
  return Contacts;
};

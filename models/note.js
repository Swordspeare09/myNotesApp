"use strict";
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define(
    "note",
    {
      body: DataTypes.TEXT
    },
    {}
  );
  note.associate = function(models) {
    note.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
 
  };
  return note;
};



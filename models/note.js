"use strict";
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define(
    "note",
    {
      body: DataTypes.TEXT,
      category: DataTypes.STRING
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



"use strict";
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define(
    "note",
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      user_id: DataTypes.INTEGER
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



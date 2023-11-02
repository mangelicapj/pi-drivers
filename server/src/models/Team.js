const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Team;
};


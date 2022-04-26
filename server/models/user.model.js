
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      check: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.STRING,
      },
      craeted_at: {
        type: DataTypes.DATE,
      },
      created_by: {
        type: DataTypes.DATE,
      },
    },{
        freezeTableName:true,
        timestamps:false,
        underscored:true
    });
    return User
  };
  
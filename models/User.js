module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    last_login_attempt: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    remember_me_token: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return User;
};

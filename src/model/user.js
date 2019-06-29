const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (user) => {
        // eslint-disable-next-line
        if (typeof user.email === 'string') user.email = user.email.toLowerCase();
      },
      beforeCreate: async (user) => {
        // eslint-disable-next-line
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  });

  User.associate = (models) => {
    models.User.belongsToMany(models.Group, { through: 'UserGroup' });
  };

  User.prototype.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};

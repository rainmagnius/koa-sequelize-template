module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Group.associate = (models) => {
    models.Group.belongsToMany(models.User, { through: 'UserGroup' });
  };

  Group.createDefault = async (models) => {
    const count = await models.Group.count();
    if (count === 0) {
      await models.Group.create({
        name: 'Example',
      });
    }
  };

  return Group;
};

const NAME = "Object";

const createModel = (sequelize, Sequelize) => {
  const Object = sequelize.define('object', {
    // FK: [1] object - [1] location NOT NULL

    // FK: [N] asset - [N] object

    // typeId: { typeId = id
    //   // [1] map/land/checkpoint - [1] object
    //   // value get from map/land/checkpoint TRIGGER
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
    type: {
      type: Sequelize.ENUM(['map', 'land', 'checkpoint']),
      allowNull: false,
    },
    code: {
      // ~ name
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    jsonData: {
        type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
  },
);
  
  return Object;
};

module.exports = {
  createModel,
  NAME
}
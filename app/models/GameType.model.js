const NAME = "GameType";

const createModel = (sequelize, Sequelize) => {
  // Trigger when CREATE: Count num_checkpoint of Land

  const GameType = sequelize.define('game_type', {
    code: {
        // ~ name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
          notNull: { msg: 'Code cannot be null'},
          notEmpty: { msg: 'Code cannot be empty' },
        }
      },
  });
  
  return GameType;
};

module.exports = {
  createModel,
  NAME
}
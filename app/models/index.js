const { Sequelize } = require('sequelize');
const config = require('../config/database.config.js')['development'];
require('dotenv').config();

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

// const sequelize = new Sequelize(process.env.DB_EXT_URI, {
//   host: config.host,
//   dialect: config.dialect,
//   logging: false,
// });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add tables to database here
db.UserAccount          = require('./UserAccount.model.js'  ).createModel(sequelize, Sequelize);
db.UserInfo             = require('./UserInfo.model.js'     ).createModel(sequelize, Sequelize);
db.Role                 = require('./Role.model.js'         ).createModel(sequelize, Sequelize);
db.Object               = require('./Object.model.js'       ).createModel(sequelize, Sequelize);
db.Asset                = require('./Asset.model.js'        ).createModel(sequelize, Sequelize);
db.Map                  = require('./Map.model.js'          ).createModel(sequelize, Sequelize);
db.Checkpoint           = require('./Checkpoint.model.js'   ).createModel(sequelize, Sequelize);
db.Location             = require('./Location.model.js'     ).createModel(sequelize, Sequelize);
db.Player               = require('./Player.model.js'       ).createModel(sequelize, Sequelize);
db.Land                 = require('./Land.model.js'         ).createModel(sequelize, Sequelize);
db.PlayerMapData        = require('./PlayerMapData.model.js').createModel(sequelize, Sequelize);
db.ObjectAssets         = require('./ObjectAssets.model.js' ).createModel(sequelize, Sequelize);
db.GameType             = require('./GameType.model.js' ).createModel(sequelize, Sequelize);
db.Game                 = require('./Game.model.js' ).createModel(sequelize, Sequelize);
db.GameLeaderboard      = require('./GameLeaderboard.model.js' ).createModel(sequelize, Sequelize);
db.LeaderboardRecord    = require('./LeaderboardRecord.model.js' ).createModel(sequelize, Sequelize);
db.Reward               = require('./Reward.model.js' ).createModel(sequelize, Sequelize);
db.RewardType           = require('./RewardType.model.js' ).createModel(sequelize, Sequelize);
db.ObjectReward         = require('./ObjectReward.model.js' ).createModel(sequelize, Sequelize);
db.PlayerReward         = require('./PlayerReward.model.js' ).createModel(sequelize, Sequelize);
db.PlayerObjectOpen     = require('./PlayerObjectOpen.model.js').createModel(sequelize, Sequelize);
// ----------------- Association

require('./association.js')(db);

db.createUtils =  require('./createUtils.js').initialUtilsWithdb(db);
db.triggerUtils = require('./triggerUtils.js').initialUtilsWithdb(db);

// --------------------- TRIGGER

// Create map/land/checkpoint follow an object

require('./trigger.js')(db);
module.exports = db;

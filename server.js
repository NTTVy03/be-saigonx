require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

// ---------------------- DATABASE
const db = require("./app/models");

db.sequelize.sync({
    force: true
    // alter: true    // alter: true will update the table schema
})
  .then(() => {
    console.log("Synced db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// ---------------------- ROUTES
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SaigonX Back-end." });
});

require("./app/routes/auth.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ---------------------- SAMPLE DATA
const bcrypt = require('bcryptjs');

async function initial() {
  // ---------------------------------------------------------
  // USER ACCOUNT & INFO & ROLE

  // #### Acount 1: Triet
  const trietAccount = await db.UserAccount.create({
    username: 'TrietHuynh',
    password: await bcrypt.hash('1234567890', 10),
    fullName: 'Huynh Cong Triet'
  });

  const trietInfo = await db.UserInfo.create({
    id: trietAccount.id,
    avatar: 'https://images.pexels.com/photos/25288209/pexels-photo-25288209/free-photo-of-a-building-with-two-windows-and-a-blue-sky.jpeg'
  });

  const trietRole1 = await db.Role.create({
    userId: trietAccount.id,
    role: 'user',
  })

  const trietRole2 = await db.Role.create({
    userId: trietAccount.id,
    role: 'admin',
  })

  // #### Acount 2: Phat
  const phatAccount = await db.UserAccount.create({
    username: 'PhatCao',
    password: await bcrypt.hash('1234567890', 10),
    fullName: 'Cao Quang Phat',
    email: 'quangphat18ti@gmail.com'
  });

  const phatInfo = await db.UserInfo.create({
    id: phatAccount.id,
    avatar: 'https://images.pexels.com/photos/25288209/pexels-photo-25288209/free-photo-of-a-building-with-two-windows-and-a-blue-sky.jpeg'
  });

  const phatRole = await db.Role.create({
    userId: phatAccount.id,
    role: 'user',
  });

  // ---------------------------------------------------------
  // MAP & LAND & CHECKPOINT
  
  // #### Sai Gon Map
  const sgMap = await db.Object.create({
    type: 'map',
    code: "Sai Gon Map",
    isActive: true,
  });

  // #### Lands in Sai Gon Map
  // LAND 1 & checkpoints:  
   const benthanhLand = await db.Object.create(
    {
      type: 'land',
      code: "Cho Ben Thanh",
      isActive: true,
    },
    {
      mapId: sgMap.id
    }
  );

  const benthanhCheckpoint1 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Cua Dong",
      isActive: true,
    },
    {
      landId: benthanhLand.id,
      ordinal: 1,
    }
  );

  const benthanhCheckpoint2 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Cua Tay",
      isActive: true,
    },
    {
      landId: benthanhLand.id,
      ordinal: 2,
    }
  );

  // LAND 2 & checkpoints:  
  const dinhdoclapLand = await db.Object.create(
    {
      type: 'land',
      code: "Dinh Doc Lap",
      isActive: true,
    },
    {
      mapId: sgMap.id
    }
  )

  const dinhdoclapCheckpoint1 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Phong hop noi cac",
      isActive: true,
    },
    {
      landId: dinhdoclapLand.id,
      ordinal: 1,
    }
  );

  const dinhdoclapCheckpoint2 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Phong tiep khach",
      isActive: true,
    },
    {
      landId: dinhdoclapLand.id,
      ordinal: 2,
    }
  );

  const dinhdoclapCheckpoint3 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Phong dai yen",
      isActive: true,
    },
    {
      landId: dinhdoclapLand.id,
      ordinal: 3,
    }
  );

  // ---------------------------------------------------------
  // LOCATION

  const location_sgMap = await db.Location.create({
    id: sgMap.id,
    lat: 10.775556,
    lng: 106.701944,
    radius: 20000,
  });

  const location_benthanhLand = await db.Location.create({
    id: benthanhLand.id,
    lat: 10.772759203799472,
    lng: 106.69797788006473,
    radius: 1000,
  });

  const location_benthanhCheckpoint1 = await db.Location.create({
    id: benthanhCheckpoint1.id,
    lat: 10.772747861891759,
    lng:  106.698437760696,
    radius: 5,
  });

  const location_benthanhCheckpoint2 = await db.Location.create({
    id: benthanhCheckpoint2.id,
    lat: 10.772317895446271,
    lng: 106.69769448596294,
    radius: 5,
  });

  const location_dinhdoclapLand = await db.Location.create({
    id: dinhdoclapLand.id,
    lat: 10.777289298168423, 
    lng: 106.69526990890068,
    radius: 1000,
  });

  const location_dinhdoclapCheckpoint1 = await db.Location.create({
    id: dinhdoclapCheckpoint1.id,
    lat: 10.777289298168392, 
    lng: 106.69526990890101,
    radius: 5,
  });

  const location_dinhdoclapCheckpoint2 = await db.Location.create({
    id: dinhdoclapCheckpoint2.id,
    lat: 10.777289298168201, 
    lng: 106.69526990890168,
    radius: 5,
  });

  const location_dinhdoclapCheckpoint3 = await db.Location.create({
    id: dinhdoclapCheckpoint3.id,
    lat: 10.777289298168605, 
    lng: 106.69526990890118,
    radius: 5,
    jsonData: {
      description: "this (lat,lng) is not correct",
    }
  });
}
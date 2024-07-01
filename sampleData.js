const db = require("./app/models");
const bcrypt = require('bcryptjs');


// ---------------------- SAMPLE DATA

async function initialSampleData() {
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

  // ------------------------------------------------------------
  const haNoiMap = await db.Object.create({
    type: 'map',
    code: "Ha Noi Map",
    isActive: false,
  });
}

module.exports = initialSampleData;
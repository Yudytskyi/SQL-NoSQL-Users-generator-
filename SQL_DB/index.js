const axios = require('axios');

const { User, dbClient } = require('./models');
const { pageSize, countPage } = require('./../configs/users.json');

(async () => {
  await User.dropTable();
  await User.createTable();

  for (var i = 0; i < countPage; i++) {
    await User.bulkCreate(await getRandomUsers({ page: i + 1 }));
  }

  await dbClient.end();
})();

async function getRandomUsers({ page }) {
  const {
    data: { results },
  } = await axios.get(
    `https://randomuser.me/api/?seed=yudytskyi&page=${page}&results=${pageSize}&inc=name,email`
  );

  return results;
}

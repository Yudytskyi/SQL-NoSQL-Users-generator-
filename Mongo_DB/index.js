const axios = require('axios');

const { User } = require('./models');
const { pageSize, countPage } = require('../configs/users.json');

(async () => {
  const users = [];
  for (var i = 0; i < countPage; i++) {
    const results = await getRandomUsers({ page: i + 1 });
    results.forEach(({ name: { first, last }, email }) =>
      users.push({
        firstName: first,
        lastName: last,
        email: email,
      })
    );
  }
  await User.deleteMany({});
  await User.insertMany(users, { rawResult: true });
  process.exit();
})();

async function getRandomUsers({ page }) {
  const {
    data: { results },
  } = await axios.get(
    `https://randomuser.me/api/?seed=yudytskyi&page=${page}&results=${pageSize}&inc=name,email`
  );

  return results;
}

class User {
  static client = null;

  static async dropTable() {
    return await User.client.query('DROP TABLE IF EXISTS users;');
  }

  static async createTable() {
    return await User.client.query(
      'CREATE TABLE IF NOT EXISTS users (id serial not null constraint users_pkey primary key, "firstName" varchar(64) not null, "lastName" varchar(64) not null, email varchar(64) not null constraint users_email_key unique);'
    );
  }

  static async bulkCreate(users) {
    const usersValuesString = users
      .map(
        ({ name, email }) =>
          `('${name.first}', '${name.last}', ${email ? `'${email}'` : 'NULL'})`
      )
      .join(',');

    return await User.client.query(
      `INSERT INTO users ("firstName", "lastName", "email") VALUES ${usersValuesString};`
    );
  }
}

module.exports = User;

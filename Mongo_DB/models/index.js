const { connect } = require('mongoose');
const User = require('./user');
const { database } = require('../../configs/db.json');

connect(
  `mongodb://localhost/${database}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
);

module.exports = {
  User,
};

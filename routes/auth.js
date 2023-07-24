const validator = require('validator');
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { getUserByEmail, addUser } = require('../db/queries/user');

module.exports = (cookieParams) => {
  // POST /api/auth/login: log in to an existing user account and receive an access token.
  router.post("/login", (req, res) => {
    // Validate the input
    const { email, password } = req.body;
    let status = 400;
    if (!(email && validator.isEmail(email))) {
      return res.status(status).send({ message: "Please provide a valid email" })
    }
    if (!password || password.length < 1) {
      return res.status(status).send({ message: "Please provide a valid password that is greater then 7 characters" })
    }

    // If valid, get user information and verify login details
    getUserByEmail(email)
      .then(({ rows: user }) => {
        const correctPassword = (user.length > 0) ? bcrypt.compareSync(password, user[0].password) : null;
        let message;
        // If user exists and password is correct
        if (correctPassword) {
          res.cookie('name', user[0].id, cookieParams);
          message = user[0];
          status = 200;
        }
        // If user exists and password is incorrect
        if (correctPassword === false) {
          message = 'Incorrect password';
        }
        // If user doesn't exist
        if (correctPassword === null) {
          message = 'Account does not exist';
        }
        return res.status(status).send({ message });
      })
  });

  // POST /api/auth/signup: create a new user account.
  router.post("/signup", async (req, res) => {
    // Validate the registration info
    const { email, password } = req.body;
    const userInfo = { email, password: bcrypt.hashSync(req.body.password, 10) };
    let status = 400
    if (!email || !validator.isEmail(email)) {
      return res.status(status).send("Please provide a valid email")
    }
    if (!password || password.length < 8) {
      return res.status(status).send("Please provide a valid password that is greater than 7 characters")
    }

    // If account does not exist vs. exists
    getUserByEmail(db, email)
      .then(() => addUser(db, userInfo))
      .then(({ rows: id }) => {
        userInfo.id = id[0].id;
        res.cookie('name', `${userInfo.id}`, cookieParams);
        return res.status(200).send(userInfo);
      })
      .catch((err) => res.status(status).send(err.detail));
  });

  return router;
};
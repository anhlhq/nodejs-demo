// const express = require("express");
const bcrypt = require("bcrypt");

// const app = express();

// module.exports = app;

const saltRounds = 10;
const pwd = "123456";

const mw1 = async (req, res, next) => {
  try {
    console.log("mw1");
    const { password } = req.body;

    const hash = await bcrypt.hash(pwd, saltRounds);

    console.log(hash);

    const match = await bcrypt.compare(password, hash);

    if (!match) {
      return res.json({
        message: "Error",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error",
    });
  }
};

module.exports = {
  mw1,
};

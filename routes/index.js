var express = require("express");
var router = express.Router();
const { mw1 } = require("../middlewares/example");
const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../jwt");

const JWT_SECRET = "t0p_s3cr3t";

/* GET home page. */
router.post("/", async function (req, res, next) {
  try {
    const { password, username } = req.body;

    const [rows, fields] = await connection
      .promise()
      .query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Password invalid",
      });
    }

    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );

    res.json({
      message: "Hello World!",
      data: {
        token,
      },
    });
  } catch (err) {
    console.log("err.message", err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/", verifyToken, (req, res) => {
  try {
    return res.json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");

const JWT_SECRET = "t0p_s3cr3t";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const plainText = jwt.decode(token);

    if (plainText) {
      next();
    }
    if (!plainText) {
      res.status(401).send({ message: "Unauthorized!" });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  verifyToken,
};

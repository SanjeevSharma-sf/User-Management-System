const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign(
    { id },
    "process.env.JWTSECRETKEY",
    {
      expiresIn: maxAge,
    }
  );
};
module.exports = createToken;
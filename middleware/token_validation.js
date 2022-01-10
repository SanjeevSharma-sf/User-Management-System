const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
module.exports.checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, "process.env.JWTSECRETKEY", (err, decoded) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token...",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User",
    });
  }
};

// token = token.slice(7);
//     jwt.verify(token, "process.env.JWTSECRETKEY", (err, decoded) => {
//       if (err) {
//         return res.json({
//           success: 0,
//           message: "Invalid Token...",
//         });
//       } else {
//         //req.decoded = decoded;
//         next();
//       }
//     });

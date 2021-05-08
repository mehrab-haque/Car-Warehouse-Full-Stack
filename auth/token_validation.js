const { json } = require("express");
const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "buet123", (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            sucess: 0,
            message: "Invalid token",
          });
        } else {
          //console.log(decoded);

          req.anything = decoded.result.m_id;
          req.admin= decoded.result.a_id;
          req.tokenData=decoded
          next();
        }
      });
    } else {
      res.json({
        sucess: 0,
        message: "Access denied! unauthorized user",
      });
    }
  },
};

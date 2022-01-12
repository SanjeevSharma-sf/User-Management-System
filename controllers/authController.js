const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByIdView,
  adduserOpertiondata,
  getNosById,
  deleteUserParmanent,
  updatenosById,
} = require("./userService");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

module.exports.adduser_get = (req, res) => {
  res.render("add-user");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

//register_post request done
module.exports.adduser_post = async (req, res) => {
  const body = req.body;
  if (body.password !== body.confirmPassword) {
    return res.status(400).json({
      success: 0,
      message: "Password do not match",
    });
  } else {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        res.render("home", { results, alert: "User added Successfully" });
      });
    });
  }
};

//login_post request done
module.exports.login_post = (req, res) => {
  const body = req.body;
  getUserByUserEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
      return false;
    }
    if (!results) {
      return res.json({
        success: 0,
        data: "Invalid email or password",
      });
    }
    const result = bcrypt.compare(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = jwt.sign(
        { result: results },
        "process.env.JWTSECRETKEY",
        {
          expiresIn: maxAge,
        }
      );
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        res.render("home", { results });
      });
    } else {
      return res.json({
        success: 0,
        data: "Invalid email or password",
      });
    }
  });
};

//getAllUsers_get request
module.exports.getAllUsersView_get = (req, res) => {
  getUsers((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render("home", { results });
  });
  console.log(results);
};

// userUserByUserId_get request done
module.exports.getUserByUserId_get = (req, res) => {
  const id = req.params.id;
  getUserByUserId(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }

    res.render("edit-user", { results });
  });
};

//getUserByUserId_post request done
module.exports.getUserByUserId_post = async (req, res) => {
  console.log(req.body);

  const body = req.body;
  body.id = req.params.id;
  body.password = undefined;
  body.confirmPassword = undefined;

  updateUser(body, (err, results) => {
    if (err) {
      console.log(err);
      return false;
    }
    if (!results) {
    }
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render("home", { results });
    });
  });
};



//view users done
module.exports.veiwuser_get = (req, res) => {
  const id = req.params.id;
  getUserByIdView(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    results.password = undefined;
    res.render("view-user", { results });
  });
};

//get nos
module.exports.addno_get = (req, res) => {
  const id = req.params.id;
  getUserByUserId(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }

    res.render("add-no", { results, flag: false });
  });
};

module.exports.addno_post = (req, res) => {
  const body = req.body;
  console.log("body ", body);
  // body.id = req.params.id;
  getNosById(body.id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("res ====> ", results);
    if (results.length == 0) {
      adduserOpertiondata(body, (err, results) => {
        if (err) {
          console.log("e1 ", err);
          res.json("end");
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found",
          });
        }

        console.log("c2 ", results);
        res.json("end");
        // res.render("add-no", { results,flag:true });
      });
    } else {
      updatenosById(body, (err, results) => {
        if (err) {
          console.log("e1 ", err);
          return res.json("end");
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found",
          });
        }
      });
    }
    // res.render("add-no", { sum, avg });
  });
};

module.exports.performOperations_get = (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id-----> ", id, typeof id);
  getNosById(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("res ====> ", results);
    if (results.length == 0) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    console.log(results);
    const { num1, num2, num3, num4, num5 } = results[0];
    const sum = num1 + num2 + num3 + num4 + num5;
    const avg = sum / 5;
    const max = Math.max(
      num1,
      Math.max(num2, Math.max(num3, Math.max(num4, num5)))
    );
    const min = Math.min(
      num1,
      Math.min(num2, Math.min(num3, Math.min(num4, num5)))
    );
    // console.log(num1);
    res.json({ avg, max, min });
    // res.render("add-no", { sum, avg });
  });
};

///this is to check only
module.exports.deleteUserPermanent = (req, res) => {
  const data = req.body;
  data.id = req.params.id;
  deleteUserParmanent(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record Not Found",
      });
    }
    return res.json({
      success: 1,
      message: "user deleted successfully",
    });
  });
};

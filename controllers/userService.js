const res = require("express/lib/response");
const db = require("../config/database");
//create user service
module.exports.create = (data, callback) => {
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [data.email],
    (error, results) => {
      if (error) {
        callback(error);
      }
      if (results > 0) {
        return res.render("add-user", {
          message: "Email is already registered",
        });
      }
      db.query(
        `insert into users(name,
        first_name,
        last_name,
        email,
        password,
        number) 
      values(?,?,?,?,?,?)`,
        [
          data.name,
          data.first_name,
          data.last_name,
          data.email,
          data.password,
          data.number,
        ],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    }
  );
};

//getUserByEmail service
module.exports.getUserByUserEmail = (email, callBack) => {
  db.query(
    `select * from users where email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
};

//getUserById service
module.exports.getUserByUserId = (id, callBack) => {
  db.query(
    `select id,name,first_name,last_name,email,number from users where id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

//getUserByIdView service
module.exports.getUserByIdView = (id, callBack) => {
  db.query(
    `select * from users where id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

//getUsersViews service
module.exports.getUsers = (callBack) => {
  db.query(
    `select id,name,first_name,last_name,email,number from users`,
    [],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

//updateUser service
module.exports.updateUser = (data, callBack) => {
  db.query(
    `update users set name = ?,first_name=?, last_name=?, number=? where id = ?`,
    [data.name, data.first_name, data.last_name, data.number, data.id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

module.exports.deleteUser = (id, callBack) => {
  db.query(`delete from users where id = ?`, [id], (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

//add no to database
module.exports.adduserOpertiondata = (data, callback) => {
  console.log("data--------> ", data);
  db.query(
    `insert into numberData(num1,
    num2,
    num3,
    num4,
    num5,
    id) 
  values(?,?,?,?,?,?)`,
    [data.num1, data.num2, data.num3, data.num4, data.num5, data.id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

module.exports.getNosById = (id, callBack) => {
  db.query(
    `select * from numberdata where id=?`,
    [id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }

      return callBack(null, results);
    }
  );
};
module.exports.updatenosById = (data,callBack) => {
  db.query(`update numberdata set num1 = ?,num2=?, num3=?, num4=?,num5 = ?  where id = ?`,
  [data.num1, data.num2, data.num3, data.num4,data.num5, data.id],
  (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  })
}

module.exports.deleteUserParmanent= (data, callBack) => {
  db.query(
    `delete from users where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}
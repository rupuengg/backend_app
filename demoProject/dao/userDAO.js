var User=require('./../model/user').User;
var config = require('./../config/dbConfig');
var db = config.db;
var md5 = require('md5');
var util= require('./../config/util');
var jwt = require('jsonwebtoken');
exports.createUser = function(user) {
  return new Promise((resolve, reject) => {
      db.sync(function(err) {
        if (err) console.log(err);
        User.create({
            first_name: user.first_name,
            last_name: user.last_name,
            dob: new Date(user.dob),
            email: user.email,
            password: md5(user.password),
            contact_no: user.contact_no,
            address: user.address
          },
          function(err, user) {
            if (err)
              reject(err);
            resolve(user);
          })
      })
    })
}
exports.userLogin = function(email,password) {
  return new Promise((resolve, reject) => {
      db.sync(function(err) {
        if (err) console.log(err);
        User.find({
            email: email,
            password: md5(password),
          },
          function(err, user) {
            if (err){
              console.log(err);
              reject(err);
            }
            if(user[0].id){
              var token=jwt.sign({userId: user[0].id, first_name: user[0].first_name, last_name: user[0].last_name,email:user[0].email}, util.superSecret, {expiresIn: 43200});
              user[0].save({token:token},function(err,user){
                if (err){
                  console.log(err);
                  reject(err);
                }
                user.password=''
                resolve(user);
              });
            }else{
              resolve();
            }

          })
      })
    })
}
exports.authUser = function(token,id,email) {
  return new Promise((resolve, reject) => {
      db.sync(function(err) {
        if (err) console.log(err);
        User.find({token:token,id:id,email:email},
          function(err, user) {
            if (err)
              reject(err);
            if(user[0] && user[0].id)
              resolve(true);
            else {
              resolve(false)
            }
          })
      })
    })
}
exports.logout = function(userId) {
  return new Promise((resolve, reject) => {
      db.sync(function(err) {
        if (err) console.log(err);
        User.find({id:userId},
          function(err, user) {
            if (err)
              reject(err);
            if(user[0] && user[0].id){
              user[0].save({token:''},function(err,user){
                if (err){
                  console.log(err);
                  reject(err);
                }
                resolve(true);
              });
            }
            else {
              resolve(false)
            }
          })
      })
    })
    }

exports.getUsers=async function(){
  return new Promise((resolve, reject) => {
      db.sync(function(err) {
        if (err) console.log(err);
        User.find({ide:2},
          function(err, user) {
            if (err)
              reject(err);

            else {
              resolve(user[0])
            }
          })
          })
      })
}

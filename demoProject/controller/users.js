exports.Login = function(req, res) {
  console.log(req.body)
  req.checkBody('username', "Username is required").notEmpty();
  req.checkBody('password', "Password is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send({
      status: 'error',
      message: errors[0].msg,
      data: {
        error: errors
      }
    });
  } else {
    var username=req.body.username,password=req.body.password;
    res.send({status:"success",message:"Authenticate successfully",data:[{username:username,password:password}]})
  }
}
exports.Logout = function(req, res) {
  console.log(req.body,req.decoded)
  res.send({status:"success",message:"Logout successfully",data:[]})
}
exports.Authenticate = function(req, res) {
  req.checkBody('username', "Username is required").notEmpty();
  req.checkBody('password', "Password is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send({
      status: 'error',
      message: errors[0].msg,
      data: {
        error: errors
      }
    });
  } else {
    var username=req.body.username,password=req.body.password;
    res.send({status:"success",message:"Authenticate successfully",data:[{username:username,password:password}]})
  }
}

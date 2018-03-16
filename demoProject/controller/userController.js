var userDAO = require('./../dao/userDAO')
exports.userRegistration = function (req, res) {
    req.checkBody('first_name', "First Name is required").notEmpty();
    req.checkBody('last_name', "Last Name is required").notEmpty();
    req.checkBody('dob', " Date of birth is required").notEmpty();
    req.checkBody('email', "Email is required").notEmpty();
    req.checkBody('email', "Please enter valid email").isEmail();
    req.checkBody('password', "Password is required").notEmpty();
    req.checkBody('contact_no', "Contact No is required").notEmpty();
    req.checkBody('address', "Address is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.send({status: 'error', message: errors[0].msg, data: {error: errors}})
    } else {
        var user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: new Date(req.body.dob),
            email: req.body.email,
            password: req.body.password,
            contact_no: req.body.contact_no,
            address: req.body.address
        }
        userDAO.createUser(user)
                .then(function (user) {
                    user.age = user.getAge();
                    user.fullName = user.getFullName();
                    res.send({status: 'success', message: 'User Register Successfully', data: user})
                })
                .catch(function (err) {
                    res.send({status: 'error', message: 'Something went wrong.Please try later', data: []})
                });
    }
}

exports.login = function (req, res) {
    req.checkBody('email', "Email Id is required").notEmpty();
    req.checkBody('email', "Please enter valid email").isEmail();
    req.checkBody('password', "Password is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.send({status: 'error', message: errors[0].msg, data: {error: errors}});
    } else {
        userDAO.userLogin(req.body.email, req.body.password)
                .then(function (user) {
                    if (user) {
                        user.age = user.getAge();
                        user.fullName = user.getFullName();
                        res.send({status: 'success', message: 'Authenticate Successfully', data: user})
                    } else {
                        res.send({status: 'success', message: 'Invalid email or password', data: user})
                    }
                })
                .catch(function (err) {
                    res.send({status: 'error', message: 'Something went wrong.Please try later', data: []})
                });
    }
}
exports.logout = async function (req, res) {
    // userDAO.logout(req.decoded.userId)
    // .then(function(data){
    //   if(data){
    //     res.send({status: 'success', message: 'Logout Successfully', data: []})
    //   }else{
    //     res.send({status: 'success', message: 'You are already logged out', data: []})
    //   }
    // })
    // .catch(function(err){
    //   console.error(err);
    //   res.send({status: 'error', message: 'Something went wrong.Please try later', data: []})
    // })

    try {
        var data = await userDAO.logout(req.decoded.userId);
        if (data) {
            res.send({status: 'success', message: 'Logout Successfully', data: []})
        } else {
            res.send({status: 'success', message: 'You are already logged out', data: []})
        }
    } catch (e) {
        console.error(e);
        res.send({status: 'error', message: 'Something went wrong.Please try later', data: []})
    }
}
exports.authenticate = function (token, decoded) {
    return new Promise((resolve, reject) => {
        userDAO.authUser(token, decoded.userId, decoded.email)
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject()
                });
    })
}
exports.getResult = async function () {
    try {
        var y = await userDAO.getUsers();
        return y;
    } catch (e) {
        console.error(e);
    }
}

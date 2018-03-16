var util = require('./demoProject/config/util.js'),
        expressValidator = require('express-validator'),
        bodyParser = require('body-parser'),
        app = util.app;
var jwt = require('jsonwebtoken')
var config = require('./demoProject/config/dbConfig')

var user = require('./demoProject/controller/userController');

app.use(bodyParser.json({limit: "50mb"})); // parse application/json
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(expressValidator());
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Route without token
app.post("/userregistration", user.userRegistration);
app.get("/", async function (req, res) {
    var x = await user.getResult();
    res.send(x)
})
app.post("/login", user.login);

//Create new router for Api which have token
var apiRoutes = util.express.Router();

//This is to route apis that has prefix "/api"
app.use('/api', apiRoutes);

//This is used to validate token in api routes
apiRoutes.use(function (req, res, next) {
    var token = req.headers.token ? req.headers.token : req.body.token;

    if (token) {
        jwt.verify(token, util.superSecret, function (err, decoded) {
            if (!err && decoded) {
                user.authenticate(token, decoded)
                        .then(function (data) {
                            if (data) {
                                req.decoded = decoded;
                                next();
                            } else {
                                res.send({status: "unauthorized", message: "You are not authorized to perform this action", data: []})
                            }
                        })
                        .catch(function () {
                            res.send({status: "unauthorized", message: "You are not authorized to perform this action", data: []})
                        })
            } else {
                res.send({status: "unauthorized", message: "You are not authorized to perform this action", data: []})
            }
        })
    } else {
        res.send({status: "unauthorized", message: "You are not authorized to perform this action", data: []})
    }
})


//Routes need token validation
apiRoutes.post('/logout', user.logout);

//Start server
app.listen(3000, function () {
    console.log("Server hosted at port 3000")
})

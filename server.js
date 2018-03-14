var expr = require('express'),
  expressValidator = require('express-validator'),
  app = expr(),
  bodyParser = require('body-parser');

var user = require('./demoProject/controller/users.js');

app.use(bodyParser.json({
  limit: "50mb"
})); // parse application/json
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
app.use(expressValidator());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//Rouute without token
app.get("/", function(req, res) {
  res.send({
    status: "succes",
    message: "Welcome",
    data: []
  })
})

app.post("/login", user.Login)


//Create new router for Api which have token
var apiRoutes = expr.Router();

//This is to route apis that has prefix "/api"


//This is used to validate token in api routes
apiRoutes.use(function(req, res, next) {
  var token = req.headers.token ? req.headers.token : req.body.token;
	console.log(token.username)
  if (token) {
    if (token) {
      req.decoded = {
        username: token
      }
     next();
    } else {
      res.send({
        status: "unauthorized",
        message: "You are not authorized to perform this action",
        data: []
      })
    }
  } else {
    res.send({
      status: "unauthorized",
      message: "You are not authorized to perform this action",
      data: []
    })
  }
})


//Routes need token validation
apiRoutes.get('/logout',user.Logout);
app.use('/api', apiRoutes);
app.listen(3000, function() {
console.log("Server hosted at port 3000")

})

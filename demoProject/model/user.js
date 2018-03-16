var config = require('./../config/dbConfig');
var db = config.db;
var User = db.define("user", {
  first_name: {type: 'text',size:50},
  last_name: {type: 'text',size:50},
  dob: Date,
  email: {type:'text',size:100},
  password: {type:'text',size:50},
  contact_no:{type:'text',size:20 },
  address: {type:'text',size:200},
  token:{type:'text',size:500}
}, {
  methods: {
    getFullName: function() {
      return this.first_name + ' ' + this.last_name;
    },
    getAge:function(){
      var today = new Date();
      var birthDate = new Date(this.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    }
  },
});
module.exports = {
  User: User
}

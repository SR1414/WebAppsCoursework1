var lessons = new Vue({
  el: "#app",
  data: {
    seen: false,
    message: 'hello world'
  }
})

function GoToLessons() {
  lessons.seen = true;
  login.seen = false;
  registration.seen = false;

}
function GoToLogin() {
  login.seen = true;
  lessons.seen = false;
  registration.seen = false;

}
function GoToRegistration() {
  registration.seen = true;
  login.seen = false;
  lessons.seen = false;
}

var login = new Vue({
  el: "#login",
  data: {
    seen: false
  }
})
var registration = new Vue({
  el: "#registration",
  data: {
    seen: false,
    message: "yes"
  }
})

var atest = new Vue({
  el: '#signup-form',
  data: {
    name: '',
    email: '',
    errors: {
      name: false,
      email: false
    },
    mounted() {
      if (localStorage.name) this.name = localStorage.name;
      if (localStorage.email) this.email = localStorage.email;
    },
  },
  methods: {
    processForm: function () {
      console.log({ name: this.name, email: this.email });
      alert('Processing');
    },
    validateEmail: function () {
      const isValid = window.isValidEmail(this.email);
      this.errors.email = !isValid;
    }
  }
});
// helpers ===============================================
/**
 * Validate emails
 * Not 100% reliable. Just a quick and dirty check.
 */
function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


var reg = new Vue({
  el: '#reg',
  data: {
    signemail: '',
    signfirstname: '',
    signlastname: '',
    signusertype: '',
    signpassword: ''

  },
  methods: {
    signup: function register() {
      var userlist = [];
      var email = this.signemail;
      var firstname = this.signfirstname;
      var lastname = this.signlastname;
      var usertype = this.signusertype;
      var password = this.signpassword;

      if (localStorage.getItem("MyUser") === null) {
        userlist.push({
          Email: email,
          Firstname: firstname,
          Lastname: lastname,
          Usertype: usertype,
          Password: password
        });
        var myuserlistserialized = JSON.stringify(userlist);
        localStorage.setItem("MyUser", myuserlistserialized);
        console.log("ADDED IF DOESNT EXIST");
        alert("Account Created");
        return;
      };
      if (localStorage.getItem("MyUser") !== null){ 
        var myuserlist_deserialized = JSON.parse(localStorage.getItem("MyUser"));
        console.log(myuserlist_deserialized);
        myuserlist_deserialized.push({
          Email: email,
          Firstname: firstname,
          Lastname: lastname,
          Usertype: usertype,
          Password: password
        });
        var myuserlistserialized = JSON.stringify(myuserlist_deserialized);
        localStorage.setItem("MyUser", myuserlistserialized);
        console.log("ADDED IF DOES EXIST");

      };
    }
  }
})

/*var reg = new Vue({
  el: '#reg',
  data: {
    email: '',
    firstname: '',
    lastname: ''
  },
  methods: {
    persist() {
      var userlist = [];
      var email = this.email;
      var firstname = this.firstname;
      var lastname = this.lastname;

      if (localStorage.getItem("MyUser") === null) {
        userlist.push({
          Email: email,
          Firstname: firstname,
          Lastname: lastname
        });
        var myuserlistserialized = JSON.stringify(userlist);
        localStorage.setItem("MyUser", myuserlistserialized);
      }
      else { 
        var myuserlist_deserialized = JSON.parse(localStorage.getItem("MyUser"));
        console.log(myuserlist_deserialized);

      };



    }
  }
})*/


//var email = "sean123";
//var firstname = "sean";
//var lastname = "riordan";


//var myuser = {
//Email: email,
//Firstname: firstname,
//Lastname: lastname
//};

/*var userlist = [];
userlist.push(
  {
    Email: email,
    Firstname: firstname,
    Lastname: lastname
  }
);

userlist.push(
  {
    Email: "newdude123",
    Firstname: "sean",
    Lastname: "dude"
  }
);

console.log(userlist);

var myuserlistserialized = JSON.stringify(userlist);

localStorage.setItem("MyUser", myuserlistserialized);
console.log(localStorage);*/
//users.push =  {
//Email: email,
//firstname: firstname,
//lastname: lastname 
//};

function createusers() {







  var userslist = new Object();
  userslist.users = users;



};
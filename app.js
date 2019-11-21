
var displaycourses = new Vue ({
  el:'#courses',
  data: {
    courses: [
      { 'topic': 'math', 'location': 'hendon', 'price': 100 },
      { 'topic': 'math', 'location': 'colindale', 'price': 80 },
      { 'topic': 'math', 'location': 'brent cross', 'price': 90 },
      { 'topic': 'math', 'location': 'golders green', 'price': 120 },
      { 'topic': 'english', 'location': 'hendon', 'price': 110 },
      { 'topic': 'english', 'location': 'colindale', 'price': 90 },
      { 'topic': 'english', 'location': 'brent cross', 'price': 90 },
      { 'topic': 'english', 'location': 'golders green', 'price': 130 },
      { 'topic': 'piano', 'location': 'hendon', 'price': 120 },
      { 'topic': 'piano', 'location': 'golders green', 'price': 140 }]
    
  }
})

////////////////////////////////////SIGNUP////////////////////////////////////////
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
      if (localStorage.getItem("MyUser") !== null) {
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
});
//////////////////////////login//////////////////////////////
var loginuser = new Vue({
  el: '#loginform',
  data: {
    logemail: '',
    logpassword: ''

  },
  methods: {
    login: function loguserin() {
      var email = this.logemail;
      var password = this.logpassword;
      var i = 0;
      var userlist = JSON.parse(localStorage.getItem("MyUser"));
      for (i = 0; i < userlist.length - 1; i++) {
        if (userlist[i].Email == email && userlist[i].Password == password) {
          var currentuserJSON = JSON.stringify(userlist[i]);
          var currentuser = userlist[i];
          localStorage.setItem("LoggedInUser", currentuserJSON);
          console.log(currentuser);
          alert(
            "log In Successful. Hello " + currentuser.Firstname + "!"
          )
        }
        if (userlist[i].Email !== email || userlist[i].Password !== password)
          alert("Email/Password is not valid");
      }
    }
  }
});

var userinfo = new Vue({
  el: '#app',
  data: {
    Email: '-',
    Firstname: '-',
    Lastname: '-',
    UserType: '-',
    Message: "Not Logged In"
  },
  methods: {
    getuserinfo: function userinfo() {
      if (localStorage.getItem("LoggedInUser") !== null) {
        var userinfo = JSON.parse(localStorage.getItem("LoggedInUser"));
        this.Email = userinfo.Email;
        this.Firstname = userinfo.Firstname;
        this.Lastname = userinfo.Lastname;
        this.UserType = userinfo.Usertype;
        this.Message = "Logged in"
        }

    }
  }
});
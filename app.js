

var courses = [
  { topic: 'math', location: 'hendon', price: 100, time: '12:00', length: 2, rating: 5, classID: 1 },
  { topic: 'math', location: 'colindale', price: 80, time: '13:00', length: 1.5,  rating: 3, classID: 2 },
  { topic: 'math', location: 'brent cross', price: 90, time: '12:00', length: 1,  rating: 4, classID: 3 },
  { topic: 'math', location: 'golders green', price: 120, time: '14:00', length: 2,  rating: 5, classID: 4 },
  { topic: 'english', location: 'hendon', price: 110, time: '15:00', length: 2.5,  rating: 5, classID: 5 },
  { topic: 'english', location: 'colindale', price: 90, time: '08:00', length: 2,  rating: 4, classID: 6 },
  { topic: 'english', location: 'brent cross', price: 90, time: '09:00', length: 2,  rating: 2, classID: 7 },
  { topic: 'english', location: 'golders green', price: 130, time: '10:00', length: 1,  rating: 5, classID: 8 },
  { topic: 'sports', location: 'hendon', price: 120, time: '14:00', length: 1,  rating: 5, classID: 9 },
  { topic: 'sports', location: 'golders green', price: 140, time: '16:00', length: 1.5,  rating: 4, classID: 10 }];

var testvue = new Vue({
  el: '#root',
  data: {
    search: '',
    checkedLocation: [],
    filterRating: '',
    filterPrice: '',
    courses: courses
  }, methods: {
    reset: function () {
      this.search = '';
      this.checkedLocation = [];
      this.filterRating = '';
      this.filterPrice = '';
    }
  },
  computed: {
    filteredCourses: function () {
      var topics = this.search;
      var locations = this.checkedLocation;
      var rating = this.filterRating;
      var price = this.filterPrice;
      return this.courses.filter(function (course) {
        var topicMatch = false;
        var locationMatch = false;
        var ratingMatch = false;
        var priceMatch = false;
        if (topics.length > 0) {
          if (course.topic.startsWith(topics)) {
            topicMatch = true;
          };
        }
        else {
          topicMatch = true;
        }
        if (locations.length > 0) {
          if (locations.includes(course.location)) {
            locationMatch = true;
          }
        }
        else {
          locationMatch = true;
        }
        if (rating.length > 0) {
          if (rating.includes(course.rating)) {
            ratingMatch = true;
          }
        }
        else {
          ratingMatch = true;
        }

        if (price.length > 0) {
          if (price >= course.price) {
            priceMatch = true;
          }
        }
        else {
          priceMatch = true;
        }
        return topicMatch && locationMatch && ratingMatch && priceMatch;
      })
    }
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
    signpassword: '',
    seen: true,

  },
  methods: {
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },
    signup: function register() {
      var userlist = [];
      var email = this.signemail;
      var firstname = this.signfirstname;
      var lastname = this.signlastname;
      var usertype = this.signusertype;
      var password = this.signpassword;
      var activity = [];
      if (!this.signemail || !this.signfirstname || !this.signlastname || !this.signpassword || !this.signusertype){
        alert("Ensure all fields are filled in with valid information");
        return;
      }
      if(!this.validEmail(this.signemail)) {
        alert("Invalid Email");
        return;        
      }
      if (localStorage.getItem("MyUser") == null) {
        userlist.push({
          Email: email,
          Firstname: firstname,
          Lastname: lastname,
          Usertype: usertype,
          Password: password,
          Activity: activity
        });
        var myuserlistserialized = JSON.stringify(userlist);
        localStorage.setItem("MyUser", myuserlistserialized);
        console.log("ADDED IF DOESNT EXIST");
        this.seen = false;
        alert("Account Created");
        return;
      };
      if (localStorage.getItem("MyUser") !== null) {
        var myusers = JSON.parse(localStorage.getItem("MyUser"));
        var i = 0;
        for (i = 0; i < myusers.length; i++) {
          if (myusers[i].Email == this.signemail) {
            alert("Email Already Registered");
               return;
          }

        }

      }
    }
  }
});
//////////////////////////login//////////////////////////////


var loginuser = new Vue({
  el: '#loginform',
  data: {
    logemail: '',
    logpassword: '',
    seen: true

  },
  methods: {
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },
    login: function loguserin() {
      var email = this.logemail;
      var password = this.logpassword;
      var i = 0;
      var userlist = JSON.parse(localStorage.getItem("MyUser"));
      var validuser;
      if (!this.logemail || !this.logpassword){
        alert("Ensure all fields are filled in with valid information");
        return;
      }
      if(!this.validEmail(this.logemail)) {
        alert("Invalid Email");
        return;        
      }
      if (localStorage.getItem("MyUser") == null){
        alert("Invalid Email/Password");
          return;
      }
      if (localStorage.getItem("MyUser") !== null){
        for (i = 0; i < userlist.length; i++) {
        console.log("2");
        if (userlist[i].Email == email && userlist[i].Password == password) {
          var currentuserJSON = JSON.stringify(userlist[i]);
          var currentuser = userlist[i];
          localStorage.setItem("LoggedInUser", currentuserJSON);
          console.log(currentuser);

          this.seen = false;
          alert(
            "log In Successful. Hello " + currentuser.Firstname + "!"
          )
          userinfo.getuserinfo();
        }
        if (userlist[i].Email !== email || userlist[i].Password !== password){
          alert("Invalid Email/Password");
          return;
        }
        
      }
      }
      
    }
  }
});

var userinfo = new Vue({
  el: '#app',
  data: {
    UserInfo: [],
    Email: '-',
    Firstname: '-',
    Lastname: '-',
    UserType: '-',
    Message: "Not Logged In",
    Activity: [],
    seen: 'false',
    selectedClassId: '',
    retrievedActivity: []

  },
  methods: {
    getuserinfo: function userinfo() {
      var loggedUser;
      if (localStorage.getItem("LoggedInUser") == null){
        loggedUser = [
          {Email: "-", FirstName: "-", LastName: "-", UserType: "-", Message: "Not Logged in"}
        ];
        var noactivity = [{ topic: '-', location: '-', price: '-', time: '-', length: '-',  rating: '-', classID: '-' }];
        this.UserInfo = loggedUser;
        this.Email = "-";
        this.Firstname = "-";
        this.Lastname = "-";
        this.UserType = "-";
        this.Message = "Not Logged In";
        this.retrievedActivity = noactivity;
        
      }
      if (localStorage.getItem("LoggedInUser") !== null) {
        var userinfo = JSON.parse(localStorage.getItem("LoggedInUser"));
        loggedUser = [
          {Email: userinfo.Email, FirstName: userinfo.Firstname, LastName: userinfo.Lastname, UserType: userinfo.Usertype, Message: "Logged in", Activity: userinfo.Activity}
        ];
        this.UserInfo = loggedUser;
        this.Email = userinfo.Email;
        this.Firstname = userinfo.Firstname;
        this.Lastname = userinfo.Lastname;
        this.UserType = userinfo.Usertype;
        this.Message = "Logged in"
        this.Activity = userinfo.Activity;
        this.retrievedActivity = userinfo.Activity;
      }
      

    },
    loguserout: function logout() {
      if (localStorage.getItem("LoggedInUser") !== null) {
        localStorage.removeItem("LoggedInUser");
        this.Email = "-";
        this.Firstname = "-";
        this.Lastname = "-";
        this.UserType = "-";
        this.Message = "Not Logged In";
        loginuser.seen = true;
        this.getuserinfo();
        return;
      }
      if (localStorage.getItem("LoggedInUser") == null) {
        alert("Not Logged In");
        return;
      }

    },
    AddClass: function addclass() {
      var StoredUsers = JSON.parse(localStorage.getItem("MyUser"));
      var courses = testvue.courses;
      var CurrentLoggedinUser = JSON.parse(localStorage.getItem("LoggedInUser"));
      var userJSON = null;
      var storeduserJSON
      var i = 0;
      for (i = 0; i < courses.length; i++) {
        if (courses[i].classID == this.selectedClassId) {
          console.log("works");
          CurrentLoggedinUser.Activity.push(courses[i]);
          userJSON = JSON.stringify(CurrentLoggedinUser);
          localStorage.setItem("LoggedInUser", userJSON);
          this.retrievedActivity = CurrentLoggedinUser.Activity;
          

          var x = 0;
          for (x = 0; x < StoredUsers.length; x++) {
            if (StoredUsers[x].Email == CurrentLoggedinUser.Email) {
              StoredUsers[x] = CurrentLoggedinUser;
              storeduserJSON = JSON.stringify(StoredUsers);
              localStorage.setItem("MyUser", storeduserJSON);

            }
          }
        }
      }
    }

  }
});
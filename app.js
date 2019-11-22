

var courses = [
  { topic: 'math', location: 'hendon', price: 100, rating: 5, classID: 1 },
  { topic: 'math', location: 'colindale', price: 80, rating: 3, classID: 2 },
  { topic: 'math', location: 'brent cross', price: 90, rating: 4, classID: 3 },
  { topic: 'math', location: 'golders green', price: 120, rating: 5, classID: 4 },
  { topic: 'english', location: 'hendon', price: 110, rating: 5, classID: 5 },
  { topic: 'english', location: 'colindale', price: 90, rating: 4, classID: 6 },
  { topic: 'english', location: 'brent cross', price: 90, rating: 2, classID: 7 },
  { topic: 'english', location: 'golders green', price: 130, rating: 5, classID: 8 },
  { topic: 'sports', location: 'hendon', price: 120, rating: 5, classID: 9 },
  { topic: 'sports', location: 'golders green', price: 140, rating: 4, classID: 10 }];

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



function getByKeyword(courses, search) {
  var searchQ = search.trim()
  if (!searchQ.length) return list
  return list.filter(item => item.name.indexOf(searchQ) > -1)
}

function getByCategory(list, category) {
  if (!category) return list
  return list.filter(item => item.category === category)
}



////////////////////////////////////SIGNUP////////////////////////////////////////
var reg = new Vue({
  el: '#reg',
  data: {
    signemail: '',
    signfirstname: '',
    signlastname: '',
    signusertype: '',
    signpassword: '',
    seen: true

  },
  methods: {
    signup: function register() {
      var userlist = [];
      var email = this.signemail;
      var firstname = this.signfirstname;
      var lastname = this.signlastname;
      var usertype = this.signusertype;
      var password = this.signpassword;
      var activity = [];

      if (localStorage.getItem("MyUser") === null) {
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
        this.seen = false;
        return;

      };
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
    login: function loguserin() {
      var email = this.logemail;
      var password = this.logpassword;
      var i = 0;
      var userlist = JSON.parse(localStorage.getItem("MyUser"));
      var validuser;
      console.log("1");
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
        }
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
    Message: "Not Logged In",
    Activity: [],
    seen: 'false',
    selectedClassId: '',
    retrievedActivity: []

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
        this.Activity = userinfo.Activity;
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
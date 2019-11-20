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
      if(localStorage.name) this.name = localStorage.name;
      if(localStorage.email) this.email = localStorage.email;
    },
  },
  methods: {
    processForm: function() {
      console.log({ name: this.name, email: this.email });
      alert('Processing');
    },
    validateEmail: function() {
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
  el:'#reg',
  data: {
    email: '',
    firstname: '',
    lastname: ''
  },
  mounted() {
    if(localStorage.email) this.email = localStorage.email;
    if(localStorage.firstname) this.firstname = localStorage.firstname;
    if(localStorage.lastname) this.lastname = localStorage.lastname;
  },
  methods: {
    persist() {
      localStorage.email = this.email;
      localStorage.firstname = this.firstname;
      localStorage.lastname = this.lastname;
    }
  }
})

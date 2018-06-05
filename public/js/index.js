$(function() {

// event handlers

$('.signup-form').on('submit', event => {
  event.preventDefault();
  console.log("signup form button working");
  userRegistration();
});

$('.login-form').on('submit', event => {
  event.preventDefault();
  console.log("login form button working");
  userLogin();
});

function userRegistration() {
    const usernameField = $(event.currentTarget).find('.new-username');
    const newUsername = usernameField.val();
    const passwordField = $(event.currentTarget).find('.new-password');
    const newPassword = passwordField.val();
    console.log(newUsername, newPassword);
    postUserRegistration(newUsername, newPassword);
}

function userLogin() {
  const usernameField = $(event.currentTarget).find('.existing-username');
    const newUsername = usernameField.val();
    const passwordField = $(event.currentTarget).find('.existing-password');
    const newPassword = passwordField.val();
    console.log(newUsername, newPassword);
    postLogin(newUsername, newPassword);
}

  // ajax post calls

function postUserRegistration(user, pw) {
  $.ajax({
    // url, method, data, success, error
    url: "/api/users",
    method: "POST",
    data: {
        username: `${user}`,
        password: `${pw}`
    },
    success: function(data) {
        console.log(data)
    },
    error: function(err) {
        console.log(err.responseText);
    },
    dataType: "json"
  })
}

function postLogin(user, pw) {
// endpoint for login /api/auth/login
  $.ajax({
    // url, method, data, success, error
    url: "/api/auth/login",
    method: "POST",
    data: {
        username: `${user}`,
        password: `${pw}`
    },
    success: function(data) {
        console.log(data)
        sessionStorage.setItem('authToken', data.authToken);
    },
    error: function(err) {
        console.log(err.responseText);
    },
    dataType: "json"
  })
}


});
$(function() {

// event handlers

$('.signup-form').on('submit', event => {
  event.preventDefault();
  userRegistration();
});

$('.login-form').on('submit', event => {
  event.preventDefault();
  userLogin();
});

$('.logout-btn').click(event => {
  event.preventDefault();
  console.log("logout button working");
  logOut();
});

function userRegistration() {
    // const usernameField = $(event.currentTarget).find('.new-username');
    const newUsername = $('.new-username').val();
    const newPassword = $('.new-password').val();
    console.log(newUsername, newPassword);
    postUserRegistration(newUsername, newPassword);
}

function userLogin() {
  const newUsername = $('.existing-username').val();
  const newPassword = $('.existing-password').val();
  console.log(newUsername, newPassword);
  postLogin(newUsername, newPassword);
}

// ajax post calls
function postUserRegistration(user, pw) {
  $.ajax({
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
  $.ajax({
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

function logOut() {
  $.ajax({
    url: "/api/logout",
    method: "GET",
    success: function(data) {
      console.log("logging out");
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

});
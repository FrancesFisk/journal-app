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
        sessionStorage.setItem('username', user);
    },
    error: function(err) {
        console.log(err.responseText);
    },
    dataType: "json"
  })
}

function loadPage() {
  loadLibrary();
};

loadPage();


// ****** DISPLAY THE LIBRARY ******
function loadLibrary() { 
  // Get library of looks
  $.ajax({
    url: "/api/makeuplooks",
    method: "GET",
    success: function(data) {
      console.log("get makeup looks", data);
      displayMakeupLooks(data);
    },
    error: function(err) {
      console.log(err.responseText);
      window.location = "index.html"
    }
  });
};

function displayMakeupLooks(data) {
  let returnHTML = "";
  looks = {};
  let results = data.makeupLooks;
  results.forEach(function(item) {
    returnHTML += 
      `<div class="thumbnail col-4" data-ref="${item.id}"> 
        <img src="${item.image}" class="thumbnail-img"> 
        <div>${item.title}</div>
      </div>`;
    looks[item.id] = item;
  })
  $('.public-looks').html(returnHTML);
};

// Logout 
$('.logout-form').submit(function(e) {
  e.preventDefault();
  console.log("logging out");
  // Remove saved data from sessionStorage
  sessionStorage.clear();
  // if in makeup.html, force user back to index.html
  if(location.pathname === '/makeup.html') {
    window.location = 'index.html';
  }
})



});
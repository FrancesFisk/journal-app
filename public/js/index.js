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
    postUserRegistration(newUsername, newPassword);
}

function userLogin() {
  const newUsername = $('.existing-username').val();
  const newPassword = $('.existing-password').val();
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
        console.log("PostUserRegistration", data)
        window.location = 'makeup.html';
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
        console.log("postLogin", data)
        sessionStorage.setItem('authToken', data.authToken);
        sessionStorage.setItem('username', user);
        window.location = 'makeup.html';
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

// ****** REGISTRATION BUTTONS ******

// Open popup listener
$('.signup-popup-btn').click(function() {
  $('.popup-signup').show();
});

// Close popup listener
$('.popup').on('click', '.close', function(e) {
  $('.popup-signup').hide();
});

$('.login-popup-btn').click(function() {
  $('.popup-login').show();
});

// Close popup listener
$('.popup').on('click', '.close', function(e) {
  $('.popup-login').hide();
});


// ****** DISPLAY THE LIBRARY ******
function loadLibrary() { 
  // Get library of looks
  $.ajax({
    url: "/api/makeuplooks",
    method: "GET",
    success: function(data) {
      displayMakeupLooks(data);
    },
    error: function(err) {
      console.log(err.responseText);
      // window.location = "index.html"
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
$('.logout-area').click(function(e) {
  console.log("logging out");
  e.preventDefault();
  // Remove saved data from sessionStorage
  sessionStorage.clear();
  // if in makeup.html, force user back to index.html
  if(location.pathname === '/makeup.html') {
    window.location = 'index.html';
  }
})



});
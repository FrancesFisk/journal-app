$(function() {

let data = sessionStorage.getItem('authToken'),
  badData = "234234432",
  looks;

// Ajax calls

// authorize with Token
console.log("makeup.js ", data);
$.ajax({
    url: "/api/protected",
    method: "GET",
    headers: { 'Authorization': `Bearer ${data}`},
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log(err.responseText);
      window.location = "index.html"
    }
})

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
})

// Event handlers

$('body').on('click', '.thumbnail', function(e) {
  console.log("thumbnail clicked");
  // $('.modal').show();
  openModal(this);
})

// Close modal
$('.modal').on('click', '.close', function(e) {
  console.log("modal close clicked");
  $('.modal').hide();
})

// Functions

function displayMakeupLooks(data) {
  let returnHTML = "";
  looks = {};
  let results = data.makeupLooks;
  results.forEach(function(item) {
    console.log(item.title);
    returnHTML += 
      `<div class="thumbnail"> 
        <img src="${item.image}" class="thumbnail-img"> 
        <div>${item.title}</div>
      </div>`;
    looks[item.title] = item;
  })
  $('.public-looks').html(returnHTML);
}

function openModal(clickedElement) {
  let thisText = $(clickedElement).text();
  console.log("openModal text", thisText);
  getDataFromApi(thisText, loadMakeupData);
}

function getDataFromApi(searchTerm, callback) {
  console.log("getDataFromApi", searchTerm);
  // Get data about the makeup Look based on the title
}

function loadMakeupData() {
  console.log("loadMakeupData");
  // add info about makeup look you want displayed in the modal
  // add function displayModal() to display the modal with the given info
}

function displayModal() {
  // display the modal with the given info from loadMakeupData
}

});
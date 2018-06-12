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
  let id = $(this).attr("data-ref");
  let clickedLook = looks[id];
  openModal(clickedLook);
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
    console.log("item", item);
    returnHTML += 
      `<div class="thumbnail" data-ref="${item.id}"> 
        <img src="${item.image}" class="thumbnail-img"> 
        <div>${item.title}</div>
      </div>`;
    looks[item.id] = item;
  })
  $('.public-looks').html(returnHTML);
}

function openModal(look) {
  let string = formatLook(look);
  console.log("string", string);
  $('.look-info').html(string);
  $('.modal').show();
  for (let key in look){
    console.log(`${key} ${look[key]}`)
  }
}

function formatLook(look) {
  let steps = "";
  console.log(typeof look.steps);
  look.steps.toString().split(",").forEach(step => {
    steps += `<li>${step}</li>`;
  }) 
  let products = "";
  look.products.forEach(product => {
    products += `<li>${product}</li>`;
  })
  let colorthemes = "";
  look.colortheme.forEach(colortheme => {
    colorthemes += `<li>${colortheme}</li>`;
  })
  return `<div>
    <img src="${look.image}"/>
    <h3>${look.title}</h3>
    <ol>${steps}</ol>
    <ul>${products}</ul>
    <p>${look.skintype}</p>
    <ul>${colorthemes}</ul>
    <button class="edit-btn" data-ref="${look.id}">Edit</button>
    <button class="delete-btn" data-ref="${look.id}">Delete</button> 
  </div>`
}

// function getDataFromApi(searchTerm, callback) {
//   console.log("getDataFromApi", searchTerm);
//   // Get data about the makeup Look based on the title
// }

function loadMakeupData() {
  console.log("loadMakeupData");
  // add info about makeup look you want displayed in the modal
  // add function displayModal() to display the modal with the given info
}

function displayModal() {
  // display the modal with the given info from loadMakeupData
}

});
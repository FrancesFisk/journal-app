$(function() {

let data = sessionStorage.getItem('authToken'),
  looks;

// FUNCTIONS
function loadPage() {
  authorizeProtectedPg();
  loadLibrary();
};
loadPage();

function authorizeProtectedPg() {
// authorize with Token
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
}

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
  })
}

// Display makeup looks on the page
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
};

// show modal with look info
function openModal(look) {
  let string = formatLook(look);
  console.log("string", string);
  $('.look-info').html(string);
  $('.modal').show();
  for (let key in look){
    console.log(`${key} ${look[key]}`)
  }
};

// format content in modal
function formatLook(look) {
  let steps = "";
  let products = "";
  let colorthemes = "";

  // Convert objects to string to array, then add to html
  look.steps.toString().split(",").forEach(step => {
    steps += `<li>${step}</li>`;
  }) 
  
  look.products.toString().split(",").forEach(product => {
    products += `<li>${product}</li>`;
  })
 
  look.colortheme.toString().split(",").forEach(colortheme => {
    colorthemes += `<li>${colortheme}</li>`;
  })

  return `<div>
    <img src="${look.image}"/>
    <h3>${look.title}</h3>
    <h4>Steps</h4>
    <ol>${steps}</ol>
    <h4>Products</h4>
    <ul>${products}</ul>
    <h4>Skin Type</h4>
    <p>${look.skintype}</p>
    <h4>Color Themes</h4>
    <ul>${colorthemes}</ul>
    <button class="edit-btn" data-ref="${look.id}">Edit</button>
    <button class="delete-btn" data-ref="${look.id}">Delete</button> 
  </div>`
};

// Delete a look 
function deleteLook(look, callback) {
  console.log(look);
  const settings = {
    method: "DELETE",
    success: function() {
      console.log("Look deleted");
    },
    error: function(err) {
      console.log(err.responseText);
    }
  }
  $.ajax(`/api/makeuplooks/${look}`, settings);
};

// EVENT HANDLERS

// click thumbnail to open modal
$('body').on('click', '.thumbnail', function(e) {
  let id = $(this).attr("data-ref");
  let clickedLook = looks[id];
  openModal(clickedLook);
});

// Close modal
$('.modal').on('click', '.close', function(e) {
  $('.modal').hide();
});

// Delete look
$( ".modal-content" ).on("click", ".delete-btn",function() {
  if(confirm("Are you sure you want to delete this look?")) {
    let id = $(this).attr("data-ref");
    deleteLook(id);
    $('.modal').hide();
 } 
});


});
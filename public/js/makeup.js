$(function() {

let data = sessionStorage.getItem('authToken'),
  badData = "234234432",
  looks;

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
        <div>for skin type: ${item.skintype}</div> 
      </div>`;
    looks[item.title] = item;
  })
  $('.public-looks').html(returnHTML);
}

$('body').on('click', '.thumbnail', function(e) {
  console.log("thumbnail clicked");
  $('.modal').show();
})

$('.modal').on('click', '.close', function(e) {
  console.log("modal close clicked");
  $('.modal').hide();
})

});
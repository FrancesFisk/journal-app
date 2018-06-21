$(function() {

let data = sessionStorage.getItem('authToken'),
  activeLook,
  files;

$('body').on('change', '#edit-file-uploader', prepareUpload); 
function prepareUpload (event) { files = event.target.files; }

// ****** LOAD PAGE ******
function loadPage() {
  authorizeProtectedPg();
};

loadPage();

// ****** AUTHORIZE PROTECTED AREA ******
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
  });
};


//  ******* NAV MENU ********
$('.toggle-nav').click(function() {
  // Calling a function in case you want to expand upon this.
  toggleNav();
});  


function toggleNav() {
if ($('#site-wrapper').hasClass('show-nav')) {
  // Do things on Nav Close
  $('#site-wrapper').removeClass('show-nav');
} else {
  // Do things on Nav Open
  $('#site-wrapper').addClass('show-nav');
}
}

});
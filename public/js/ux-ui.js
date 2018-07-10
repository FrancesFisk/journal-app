$(function() {

//  ******* IMGUR INSTRUCTIONS ********
$('.imgur-btn').click(function() {
  toggleImgurInstructions();
});

function toggleImgurInstructions() {
  if ($('.imgur-instructions ol').hasClass('hide')) {
    $('.imgur-instructions ol').removeClass('hide');
  } else {
    $('.imgur-instructions ol').addClass('hide');
  }
}


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
$(function() {

let files,
  steps = 1,
  products = 1,
  colorthemes = 1;

// Handle image files
$('input[type=file]').on('change', prepareUpload); 
function prepareUpload (event) { files = event.target.files; }

// ******* CREATE LOOK *********

// Submit handler for creating a look form
$('#create-look-form').submit(function(e) {
  e.preventDefault();
  let stepsArray = [];
  let productsArray = [];
  let colorthemesArray =[];
  let skinType = $('#select-skintype').val();

  for(let i = 1; i <= steps; i++) {
    let inputField = $(`input[name=step_${i}]`);
    // if it exists on the page
    if (inputField.length) {
      stepsArray.push(inputField.val());
    }
  }
  console.log("stepsArray", stepsArray);

    // stepsArray.map(str => str.replace(/,/g, '&#44;'));
 
  
  for(let i = 1; i <= products; i++) {
    let inputField = $(`input[name=product_${i}]`);
    // if it exists on the page
    if (inputField.length) {
      productsArray.push(inputField.val());
    }
  }

  for(let i = 1; i <= colorthemes; i++) {
    let inputField = $(`input[name=colortheme_${i}]`);
    // if it exists on the page
    if (inputField.length) {
      colorthemesArray.push(inputField.val());
    }
  }

  // If user doesn't select a skintype
  if($('#select-skintype').val() === "Select skintype") {
    skinType = "N/A";
  }

  // Remove falsy values from arrays
  stepsArray = stepsArray.filter(Boolean);
  productsArray = productsArray.filter(Boolean);
  colorthemesArray = colorthemesArray.filter(Boolean);

  // Compile key/value pairs to send form data
  let data = new FormData(); 
  $.each(files, function(key, value) { data.append(key, value); });
  // first argument is the name
  data.append("title", $('input[name=title]').val());
  data.append("steps", stepsArray);
  data.append("products", productsArray);
  data.append("skintype", skinType);
  data.append("colortheme", colorthemesArray);
  
  // API request
  $.ajax({
    url: '/api/makeuplooks/create',
    type: "POST",
    data: data,
    cache: false, 
    dataType: 'json', 
    processData: false, 
    contentType: false,
    headers: { 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`},
    success: function(data) {
      console.log("Makeup look created: ", data);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
});

// Add fields in the create look form
$('#create-look-form .add-step').click(e => {
  e.preventDefault();
  steps++;
  let newHTML = `
    <div><input type="text" name="step_${steps}" class="step multiple-fields-option" />
    <button class="delete-field">&times;</button></div>
  `;
  $('.steps').append(newHTML);
});

$('#create-look-form .add-product').click(e => {
  e.preventDefault();
  products++;
  let newHTML = `
    <div><input type="text" name="product_${products}" class="product multiple-fields-option" />
    <button class="delete-field">&times;</button></div>
  `;
  $('.products').append(newHTML);
});

$('#create-look-form .add-colortheme').click(e => {
  e.preventDefault();
  colorthemes++;
  let newHTML = `
    <div><input type="text" name="colortheme_${colorthemes}" class="colortheme multiple-fields-option" />
    <button class="delete-field">&times;</button></div>
  `;
  $('.colorthemes').append(newHTML);
});

// Delete field in the create look form
$('.create-look').on('click', '.delete-field', function(e) {
  $(this).parent().remove();
});

});
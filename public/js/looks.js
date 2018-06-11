$(function() {


$('.modal-content').on('click', '.delete-btn', function(e) {
  console.log("delete button clicked");
})

$('.modal-content').on('click', '.edit-btn', function(e) {
  console.log("edit button clicked");
})

// Delete field
$('.create-look').on('click', '.delete-field', function(e) {
    $(this).prev().remove();
    $(this).remove();
  })


let files; 
$('input[type=file]').on('change', prepareUpload); 
function prepareUpload (event) { files = event.target.files; }


$('#create-look-form').submit(e => {
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

  if($('#select-skintype').val() === "Select skintype") {
    skinType = "N/A";
  }

  stepsArray = stepsArray.filter(Boolean);
  productsArray = productsArray.filter(Boolean);
  colorthemesArray = colorthemesArray.filter(Boolean);

  let data = new FormData(); 
  $.each(files, function(key, value) { data.append(key, value); });
  // first argument is the name
  data.append("title", $('input[name=title]').val());
  data.append("steps", stepsArray);
  data.append("products", productsArray);
  data.append("skintype", skinType);
  data.append("colortheme", colorthemesArray);

  console.log("files", files);
  
console.log(data);
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
      console.log(data);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
});


// create new look form
// let steps = 1;
// $('.add-step').click(e => {
//   e.preventDefault();
//   steps++;
//   let newHTML = `
//     <div><input type="text" name="step_${steps}" class="steps" />
//     <button class="delete-field">&times;</button></div>
//   `;
//   let tempStep = steps -1;
//   $(`input[name=step_${tempStep}]`).parent().after(newHTML);
//   console.log("new html", newHTML);
// });

// let products = 1;
// $('.add-product').click(e => {
//   e.preventDefault();
//   products++;
//   let newHTML = `
//     <div><input type="text" name="product_${steps}" class="products" />
//     <button class="delete-field">&times;</button></div>
//   `;
//   let tempProduct = products -1;
//   $(`input[name=product_${tempProduct}]`).parent().after(newHTML);
// });

// let colorthemes = 1;
// $('.add-colortheme').click(e => {
//   e.preventDefault();
//   colorthemes++;
//   let newHTML = `
//     <div><input type="text" name="colortheme_${steps}" class="colorthemes" />
//     <button class="delete-field">&times;</button></div>
//   `;
//   let tempColortheme = colorthemes -1;
//   $(`input[name=colortheme_${tempColortheme}]`).after(newHTML);

// });

let steps = 1;
$('.add-step').click(e => {
  e.preventDefault();
  steps++;
  let newHTML = `
    <div><input type="text" name="step_${steps}" class="steps multiple-fields-option" />
    <button class="delete-field">&times;</button></div>
  `;
  $('.steps').append(newHTML);
});

let products = 1;
$('.add-product').click(e => {
  e.preventDefault();
  products++;
  let newHTML = `
    <div><input type="text" name="product_${products}" class="products multiple-fields-option" />
    <button class="delete-field">&times;</button></div>
  `;
  $('.products').append(newHTML);
});

let colorthemes = 1;
$('.add-colortheme').click(e => {
  e.preventDefault();
  colorthemes++;
  let newHTML = `
    <div><input type="text" name="colortheme_${colorthemes}" class="colorthemes multiple-fields-option" />
    <button class="delete-field">&times;</button></div>
  `;
  $('.colorthemes').append(newHTML);
});



});
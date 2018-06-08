$(function() {

$('.modal-content').on('click', '.delete-btn', function(e) {
  console.log("delete button clicked");
})

$('.modal-content').on('click', '.edit-btn', function(e) {
  console.log("edit button clicked");
})

let files; 
$('input[type=file]').on('change', prepareUpload); 
function prepareUpload (event) { files = event.target.files; }

$('#create-look-form').submit(e => {
  e.preventDefault();
  // put 
  // let data = new FormData(); 
  // // $.each(files, function(key, value) { data.append(key, value); });
  // // "title" is the name
  // data.append("title", $('input[name=title]').val());
  let data = {title: $('input[name=title]').val()}
console.log(data);
  $.ajax({
    url: '/api/makeuplooks/create',
    type: "POST",
    data: data,
    headers: { 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`},
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log(error.responseText);
    }
  });
});



// create new look form
let steps = 1;
$('.add-step').click(e => {
  e.preventDefault();
  steps++;
  let newHTML = `
    <input type="text" name="step_${steps}" required/>
  `;
  let tempStep = steps -1;
  $(`input[name=step_${tempStep}]`).after(newHTML);
})

let products = 1;
$('.add-product').click(e => {
  e.preventDefault();
  products++;
  let newHTML = `
    <input type="text" name="product_${products}" required/>
  `;
  let tempProduct = products -1;
  $(`input[name=product_${tempProduct}]`).after(newHTML);
})

let colortheme = 1;
$('.add-colortheme').click(e => {
  e.preventDefault();
  colortheme++;
  let newHTML = `
    <input type="text" name="color_${colortheme}" required/>
  `;
  let tempColortheme = colortheme -1;
  $(`input[name=color_${tempColortheme}]`).after(newHTML);

})

});
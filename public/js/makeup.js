$(function() {

let data = sessionStorage.getItem('authToken'),
  looks,
  activeLook;


// ****** LOAD PAGE ******
function loadPage() {
  console.log("loadpage happening");
  authorizeProtectedPg();
  loadLibrary();
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

// ****** DISPLAY THE LIBRARY ******
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
  });
};

function displayMakeupLooks(data) {
  let returnHTML = "";
  looks = {};
  let results = data.makeupLooks;
  results.forEach(function(item) {
    returnHTML += 
      `<div class="thumbnail" data-ref="${item.id}"> 
        <img src="${item.image}" class="thumbnail-img"> 
        <div>${item.title}</div>
      </div>`;
    looks[item.id] = item;
  })
  $('.public-looks').html(returnHTML);
};

// ****** MODAL ******

// Open modal listener
$('body').on('click', '.thumbnail', function(e) {
  let id = $(this).attr("data-ref");
  activeLook = looks[id];
  openModal(activeLook);
});

// Close modal listener
$('.modal').on('click', '.close', function(e) {
  $('.modal').hide();
  $('.look-info').removeClass('hide');
  $('.edit-info').addClass('hide');
});

function openModal(look) {
  let string = formatLook(look);
  $('.look-info').html(string);
  $('.modal').show();
  // for (let key in look){
  //   console.log(`${key} ${look[key]}`)
  // }
};

// format content in modal
function formatLook(look) {
  let steps = "";
  let products = "";
  let colorthemes = "";

  // Convert objects to string to array, then add to html
  look.steps.toString().split(",").forEach(step => {
    steps += `<li>${step}</li>`;
  }) ;
 
  
  look.products.toString().split(",").forEach(product => {
    products += `<li>${product}</li>`;
  });
 
  look.colortheme.toString().split(",").forEach(colortheme => {
    colorthemes += `<li>${colortheme}</li>`;
  });

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

// ****** DELETE A LOOK ******

// Delete look listener
$( '.modal-content' ).on('click', '.delete-btn',function() {
  if(confirm("Are you sure you want to delete this look?")) {
    let id = $(this).attr('data-ref');
    deleteLook(id);
    $('.modal').hide();
 } 
});

function deleteLook(look, callback) {
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

// // ****** EDIT A LOOK ******

function editLook() {
  // get id of look
  // grab values from form
  // input values to PUT request
}

function displayEditForm(look) {
  let stepsArray = look.steps[0].split(",");
  let productsArray = look.products[0].split(",");
  let colorthemesArray = look.colortheme[0].split(",");

  let skinTypeOptions = "";
  ['oily', 'dry', 'combination', 'normal'].forEach(item => {
    if(look.skintype === item) {
      skinTypeOptions+= `<option selected>${item}</option>`
    } else {
      skinTypeOptions+= `<option>${item}</option>`
    };
  });

  let steps = "";
  if (!look.steps) {
    steps = `<input type="text" name="step_1" class="step"/><br/>`;
  } else {
    stepsArray.forEach((step, index) => {
      let stepNumber = index +1;
      if(index === 0) {
        steps = `<input type="text" name="step_1" class="step" value="${step}"/><br/>`;
      } else {
        steps+= `<div><input type="text" name="step_${stepNumber}" class="step multiple-fields-option" value="${step}"/>
        <button class="delete-field">&times;</button></div>`
      };
    });
  };

  let products = "";
  if (!look.products) {
    products = `<input type="text" name="product_1" class="product"/><br/>`;
  } else {
    productsArray.forEach((product, index) => {
      let productNumber = index +1;
      if(index === 0) {
        products = `<input type="text" name="product_1" class="product" value="${product}"/><br/>`;
      } else {
        products+= `<div><input type="text" name="product_${productNumber}" class="product multiple-fields-option" value="${product}"/>
        <button class="delete-field">&times;</button></div>`
      };
    });
  };

  let colorthemes = "";
  if (!look.colortheme) {
    colorthemes = `<input type="text" name="colortheme_1" class="product"/><br/>`;
  } else {
    colorthemesArray.forEach((colortheme, index) => {
      let colorthemeNumber = index +1;
      if(index === 0) {
        colorthemes = `<input type="text" name="colortheme_1" class="colortheme" value="${colortheme}"/><br/>`;
      } else {
        colorthemes+= `<div><input type="text" name="colortheme_${colorthemeNumber}" class="colortheme multiple-fields-option" value="${colortheme}"/>
        <button class="delete-field">&times;</button></div>`
      };
    });
  };

  return `<form id="edit-look-form" enctype="multipart/form-data">
          <input type="file" name="image"/><br/>
          <label for="title">Title</label><br/>
          <input type="text" name="title" value="${look.title}" required/><br/>
          <div class="steps">
          <label for="steps">Steps</label>
            <br/>${steps}
          </div>
          <button class="small italic add-step">Add another step</button>
          <div class="products">
            <label for="products">Products</label>
            <br/>${products}
          </div>
          <button class="small italic add-product">Add another product</button>
          <select id="select-skintype">
            <option>Select skintype</option>
            ${skinTypeOptions}
          </select>
          <div class="colorthemes">
            <label for="colorthemes">Color Themes</label>
            <br/>${colorthemes}
          </div>
          <button class="small italic add-colortheme">Add another color theme</button>
          <button type="submit" class="edit-look-btn">Submit</button>
          <button type="button" class="cancel-edit">Cancel</button>
      </form>`
  
};

function addStep() {
  $('.edit-info').on('click', '.add-step', e => {
    e.preventDefault();
    let steps = 1;
    steps++;
    let newHTML = `
      <div><input type="text" name="step_${steps}" class="step multiple-fields-option" />
      <button class="delete-field">&times;</button></div>
    `;
    $('.steps').append(newHTML);
  });
};

function addProduct() {
  $('.edit-info').on('click', '.add-product', e => {
    e.preventDefault();
    let products = 1;
    products++;
    let newHTML = `
      <div><input type="text" name="product_${products}" class="product multiple-fields-option" />
      <button class="delete-field">&times;</button></div>
    `;
    $('.products').append(newHTML);
  });
};

function addColortheme() {
  $('.edit-info').on('click', '.add-colortheme', e => {
    e.preventDefault();
    let colorthemes = 1;
    colorthemes++;
    let newHTML = `
      <div><input type="text" name="colortheme_${colorthemes}" class="colortheme multiple-fields-option" />
      <button class="delete-field">&times;</button></div>
    `;
    $('.colorthemes').append(newHTML);
  });
};

// Delete field in the create look form
$('.edit-info').on('click', '.delete-field', function(e) {
  $(this).parent().remove();
});

// Submit edits button listener
$('.modal').on('submit', e => {
  e.preventDefault();
  let id = $(this).attr('data-ref');
  editLook(id);
});

// Cancel edit form listener
$('.modal').on('click', '.cancel-edit', function(e) {
  $('.modal').hide();
  $('.look-info').removeClass('hide');
  $('.edit-info').addClass('hide');
});

// Edit button listener
$( '.modal-content' ).on('click', '.edit-btn', function(e) {
  e.preventDefault();
  addStep();
  addProduct();
  addColortheme();
  $('.look-info').addClass('hide');
  $('.edit-info').removeClass('hide');
  $('.edit-info').html(displayEditForm(activeLook));
});


});
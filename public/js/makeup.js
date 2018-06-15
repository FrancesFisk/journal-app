$(function() {

let data = sessionStorage.getItem('authToken'),
  looks,
  activeLook;

// FUNCTIONS
function loadPage() {
  authorizeProtectedPg();
  loadLibrary();
  $('.create-look').html(displayCreateForm());
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
  $('.look-info').html(string);
  $('.modal').show();
  for (let key in look){
    console.log(`${key} ${look[key]}`)
  }
};


// format content in modal
function formatLook(look) {
  console.log("format look")
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

function editLook(look, callback) {
  console.log("editLook called", look);
}

function displayCreateForm() {
  return `<form id="create-look-form" enctype="multipart/form-data">
    <input type="file" name="image"/><br/>
    <label for="title">Title</label><br/>
    <input type="text" name="title" required/><br/>
    <div class="steps">
      <label for="steps">Steps</label><br/>
      <input type="text" name="step_1"/><br/>
    </div>
    <button class="small italic add-step">Add another step</button>
    <div class="products">
      <label for="products">Products</label><br/>
      <input type="text" name="product_1"/>
    </div>
    <button class="small italic add-product">Add another product</button>
    <select id="select-skintype">
      <option>Select skintype</option>
      <option>oily</option>
      <option>dry</option>
      <option>combination</option>
      <option>normal</option>
    </select><br/>
    <div class="colorthemes">
      <label for="colorthemes">Color Theme</label><br/>
      <input type="text" name="colortheme_1"/><br/>
    </div>
    <button class="small italic add-colortheme">Add another color theme</button>
    <button type="submit" class="submit-look-btn">Submit</button>
  </form>`;
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
    }
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
      }
    })
  }

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
      }
    });
  }

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
      }
    });
  }

  return `<form id="create-look-form" enctype="multipart/form-data">
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
          <button type="submit" class="submit-look-btn">Submit</button>
          <button type="button" class="cancel-edit">Cancel</button>
      </form>`
  
}

// EVENT HANDLERS

// click thumbnail to open modal
$('body').on('click', '.thumbnail', function(e) {
  console.log("looks", looks);
  let id = $(this).attr("data-ref");
  activeLook = looks[id];
  openModal(activeLook);
});

// Close modal
$('.modal').on('click', '.close', function(e) {
  $('.modal').hide();
  $('.look-info').removeClass('hide');
  $('.edit-info').addClass('hide');
});

// Cancel edit form / close modal
$('.modal').on('click', '.cancel-edit', function(e) {
  $('.modal').hide();
  $('.look-info').removeClass('hide');
  $('.edit-info').addClass('hide');
});

// Delete look
$( '.modal-content' ).on('click', '.delete-btn',function() {
  if(confirm("Are you sure you want to delete this look?")) {
    let id = $(this).attr('data-ref');
    deleteLook(id);
    $('.modal').hide();
 } 
});

// Edit look
$( '.modal-content' ).on('click', '.edit-btn', function(e) {
  e.preventDefault();
  $('.look-info').addClass('hide');
  $('.edit-info').removeClass('hide');
  $('.edit-info').html(displayEditForm(activeLook));
});



// get the active look into the display form function
// how to format form in case parameter is not undefined

});
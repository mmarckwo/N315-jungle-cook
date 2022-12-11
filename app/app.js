import * as MODEL from "./model.js";

function initLinkListener() {
  $(window).on("hashchange", route);
  route();
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  let pageIDArray = pageID.split("/");
  pageID = pageIDArray[0];
  let subPageID = pageIDArray[1];
  console.log("sub" + subPageID);

  if (pageID == "") {
    MODEL.changePage("home");
  } else {
    if (pageID == subPageID) {
      MODEL.changePage(pageID);
    } else if (pageID == "home") {
      MODEL.changePage(pageID, subPageID);
    } else if (pageID == "createrecipe") {
      MODEL.changePage(pageID, subPageID, createRecipeListeners);
    } else if (pageID == "login") {
      MODEL.changePage(pageID, subPageID, loginListeners);
    } else {
      MODEL.changePage(pageID, subPageID);
    }
  }
}

function loginListeners() {
  $("#loginSubmit").on("click", (e) => {
    e.preventDefault();

    let email = $("#loginEm").val();
    let password = $("#loginPw").val();
    console.log(email, password);

    console.log(MODEL.getUserInfo());
  });

  $("#createSubmit").on("click", (e) => {
    e.preventDefault();

    // get values in create account section input fields.
    let firstName = $("#createFn").val();
    let lastName = $("#createLn").val();
    let email = $("#createEm").val();
    let password = $("#createPw").val();

    // put input field values into json.
    let userCreateData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    // set created json as user account data.
    MODEL.setUserInfo(userCreateData);
  });
}

function createRecipeListeners() {
  // default number of fields for both is 3.
  var stepCount = 3;
  var ingredientCount = 3;

  $("#addStep").on("click", (e) => {
    e.preventDefault();

    // increase the number of steps by 1.
    stepCount++;

    // add another input field to the steps section.
    $(".steps").append(
      `<input type="text" id="step${
        stepCount - 1
      }" placeholder="Step #${stepCount}" />`
    );
  });

  $("#addIngredient").on("click", (e) => {
    e.preventDefault();

    // increase the number of ingredients by 1.
    ingredientCount++;

    // add another input field to the ingredients section.
    $(".ingred").append(
      `<input type="text" id="ingred${
        ingredientCount - 1
      }" placeholder="Ingredient #${ingredientCount}" />`
    );
  });

  $("#submitBtn").on("click", (e) => {
    e.preventDefault();

    // add to recipe json when done.

    for (let i = 0; i < stepCount; i++) {
      let test = $(`#step${i}`).val();
      console.log(test);
    }

    for (let i = 0; i < ingredientCount; i++) {
      let test = $(`#ingred${i}`).val();
      console.log(test);
    }
  });
}

function editRecipeListeners() {
  // default number of fields for both is 3.
  var stepCount = 3;
  var ingredientCount = 3;
  var intstructionCount = 3;

  $("#addStep").on("click", (e) => {
    e.preventDefault();

    // increase the number of steps by 1.
    stepCount++;

    // add another input field to the steps section.
    $(".steps").append(
      `<input type="text" id="step${
        stepCount - 1
      }" placeholder="Step #${stepCount}" />`
    );
  });

  $("#addIngredient").on("click", (e) => {
    e.preventDefault();

    // increase the number of ingredients by 1.
    ingredientCount++;

    // add another input field to the ingredients section.
    $(".ingred").append(
      `<input type="text" id="ingred${
        ingredientCount - 1
      }" placeholder="Ingredient #${ingredientCount}" />`
    );
  });

  $("#submitBtn").on("click", (e) => {
    e.preventDefault();

    // add to recipe json when done.

    for (let i = 0; i < stepCount; i++) {
      let test = $(`#step${i}`).val();
      console.log(test);
    }

    for (let i = 0; i < ingredientCount; i++) {
      let test = $(`#ingred${i}`).val();
      console.log(test);
    }
  });
}

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav li a").forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.classList.add("active");
  }
});

$(document).ready(function () {
  initLinkListener();
});

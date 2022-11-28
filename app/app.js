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

    let firstName = $("#createFn").val();
    let lastName = $("#createLn").val();
    let email = $("#createEm").val();
    let password = $("#createPw").val();

    let userCreateData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    MODEL.setUserInfo(userCreateData);
  });
}

function createRecipeListeners() {
  var stepCount = 3;
  var ingredientCount = 3;

  $("#addStep").on("click", (e) => {
    e.preventDefault();

    stepCount++;

    $(".steps").append(
      `<input type="text" id="step${
        stepCount - 1
      }" placeholder="Step #${stepCount}" />`
    );
  });

  $("#addIngredient").on("click", (e) => {
    e.preventDefault();

    ingredientCount++;

    $(".ingred").append(
      `<input type="text" id="ingred${
        ingredientCount - 1
      }" placeholder="Ingredient #${ingredientCount}" />`
    );
  });

  $("#submitBtn").on("click", (e) => {
    e.preventDefault();

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

function initApp() {
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  // initLinkListener and initApp are duplicate functions. change or delete one later.
  //initLinkListener();
  initApp();
});

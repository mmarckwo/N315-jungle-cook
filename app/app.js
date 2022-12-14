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
    } else if (pageID == "createrecipe") {
      if (jQuery.isEmptyObject(MODEL.getUserInfo())) {
        Swal.fire("Please log in first to view this page");
        return;
      }
      MODEL.changePage(pageID, subPageID, createRecipeListeners);
    } else if (pageID == "login") {
      MODEL.changePage(pageID, subPageID, loginListeners);
    } else if (pageID == "home") {
      MODEL.changePage(pageID, subPageID);
    } else if (pageID == "yourrecipes") {
      if (jQuery.isEmptyObject(MODEL.getUserInfo())) {
        Swal.fire("Please log in first to view this page");
        return;
      }
      if (subPageID == "viewrecipe") {
        MODEL.changePage(pageID, subPageID, customRecipeListeners);
      } else if (subPageID == "editrecipe") {
        MODEL.changePage(pageID, subPageID, editRecipeListeners);
      } else {
        MODEL.changePage(pageID, subPageID, yourRecipesListeners);
      }
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

    if (jQuery.isEmptyObject(MODEL.getUserInfo())) {
      Swal.fire("No account has been made yet. Sign up first.");
    } else {
      Swal.fire("You are already logged in.");
    }
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
  // insert user's name into h1.
  $("h1").html(`Hey ${MODEL.getUserInfo().firstName}, create your recipe!`);

  // default number of fields.
  var stepCount = 5;
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
    var recipe = {
      steps: [],
      customSteps: [],
      ingredients: [],
    };

    for (let i = 1; i < stepCount; i++) {
      let step = $(`#step${i}`).val();
      if (i >= 5) {
        recipe.customSteps.push(step);
      } else {
        recipe.steps.push(step);
      }
    }

    for (let i = 0; i < ingredientCount; i++) {
      let ingredient = $(`#ingred${i}`).val();
      recipe.ingredients.push(ingredient);
    }

    MODEL.addToRecipeList(recipe);
    // send the user to view their newly-made recipe.
    window.location.hash = "yourrecipes";
  });
}

function editRecipeListeners() {
  // get the current recipe.
  var recipe = MODEL.getRecipeList()[MODEL.getViewingRecipe()];

  // insert user's name into h1.
  $("h1").html(`Hey ${MODEL.getUserInfo().firstName}, edit your recipe!`);

  // default number of fields.
  var stepCount = 5;
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

  // populate input field values with recipe data.
  $("#step1").val(recipe.steps[0]);
  $("#step2").val(recipe.steps[1]);
  $("#step3").val(recipe.steps[2]);
  $("#step4").val(recipe.steps[3]);
  // loop through custom steps and add fields with data for each step.
  $.each(recipe.customSteps, function (i, step) {
    $("#addStep").get(0).click();
    $(`#step${i + 5}`).val(step);
  });

  $("#ingred0").val(recipe.ingredients[0]);
  $("#ingred1").val(recipe.ingredients[1]);
  $("#ingred2").val(recipe.ingredients[2]);
  // loop through extra ingredients and add fields with data for each ingredient.
  for (let i = 3; i < recipe.ingredients.length; i++) {
    $("#addIngredient").get(0).click();
    $(`#ingred${i}`).val(recipe.ingredients[i]);
  }

  $("#submitBtn").on("click", (e) => {
    e.preventDefault();

    // update to recipe json when done.
    var recipe = {
      steps: [],
      customSteps: [],
      ingredients: [],
    };

    for (let i = 1; i < stepCount; i++) {
      let step = $(`#step${i}`).val();
      if (i >= 5) {
        recipe.customSteps.push(step);
      } else {
        recipe.steps.push(step);
      }
    }

    for (let i = 0; i < ingredientCount; i++) {
      let ingredient = $(`#ingred${i}`).val();
      recipe.ingredients.push(ingredient);
    }

    MODEL.updateRecipe(recipe);
    // send the user to view their newly-updated recipe.
    window.location.hash = "yourrecipes";
  });
}

function yourRecipesListeners() {
  // set header to greet user.
  $(".title").html(
    `Hey, ${MODEL.getUserInfo().firstName}, here are your recipes!`
  );

  // populate with available recipes.
  $.each(MODEL.getRecipeList(), function (index, recipe) {
    $(".col").append(`<div class="recipe">
    <div class="recipeimg">
      <button class="view">
        <a class="viewRecipe" href="#yourrecipes/viewrecipe" id="${index}">View</a>
      </button>
    </div>
    <div class="card">
      <div class="cardcontent">
        <h1>${recipe.steps[0]}</h1>
        <p>
          ${recipe.steps[1]}
        </p>

        <div class="info">
          <div class="info1">
            <img src="img/time.svg" alt="" class="time" />
            <p>${recipe.steps[2]}</p>
          </div>
          <div class="info2">
            <img src="img/servings.svg" alt="" class="yield" />
            <p>${recipe.steps[3]}</p>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="edit">
          <a class="viewRecipe" href="#yourrecipes/editrecipe" id=${index}>Edit Recipe</a>
        </button>
        <button class="delete" id="delete${index}">
          <a class="deleteButton" href="pages/yourrecipes.html">Delete</a>
        </button>
      </div>
    </div>
  </div>`);

    $(".viewRecipe").on("click", (e) => {
      MODEL.setViewingRecipe(e.target.id);
    });

    // delete the recipe, refresh the page.
    $(`#delete${index}`).on("click", (e) => {
      e.preventDefault();
      var id = $(`#delete${index}`).attr("id");
      id = id.replace("delete", "");
      MODEL.deleteRecipe(id);

      // refresh the page.
      MODEL.changePage("yourrecipes", null, yourRecipesListeners);
    });
  });
}

function customRecipeListeners() {
  var recipe = MODEL.getRecipeList()[MODEL.getViewingRecipe()];

  // set recipe description.
  $(".desc p").html(`${recipe.steps[1]}`);

  // set recipe ingredients.
  $(".ingredient li").html("");
  $.each(recipe.ingredients, function (i, ingred) {
    $(".ingredient li").append(`<ul>${ingred}</ul>`);
  });

  // set recipe steps.
  $(".instructions li").html("");
  $.each(recipe.customSteps, function (i, step) {
    $(".instructions li").append(`<ul>${step}</ul>`);
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
  loginListeners();
  // createRecipeListeners();
  // editRecipeListeners();
});

var userInfo = {};
var recipeList = [];
var viewingRecipe;

export function changePage(pageID, subPageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
      if (callback) {
        callback();
      }
    });
    // console.log(a);
  } else if (subPageID != undefined) {
    $.get(`pages/subpages/${subPageID}.html`, function (data) {
      //console.log("data " + data);
      $("#app").html(data);
      if (callback) {
        callback();
      }
    });
  } else {
    $.get(`pages/${pageID}.html`, function (data) {
      //console.log("data " + data);
      $("#app").html(data);
      if (callback) {
        callback();
      }
    });
  }
}

export function setUserInfo(userData) {
  userInfo = userData;
  console.log(userInfo);
}

export function getUserInfo() {
  return userInfo;
}

export function getRecipeList() {
  return recipeList;
}

export function addToRecipeList(recipe) {
  recipeList.push(recipe);
  console.log(recipeList);
}

export function getViewingRecipe() {
  return viewingRecipe;
}

export function setViewingRecipe(recipeID) {
  viewingRecipe = recipeID;
}

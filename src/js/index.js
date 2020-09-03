


// This is the global App controller. In this file, we make the 
// View/User-Interface for each aspect of the Web-Application
// work seamlessly with the Models/ Aspect of the Web-Application 
// where all the actual calculations and substantiation is happening

//importing the search model
import Search from './models/Search';

//impprting the recipe model
import Recipe from './models/Recipe';

//impprting the List model
import List from './models/List';

import Likes from './models/Likes';

//We are going to need all the functions from the search view thus we are importing them in this format
import * as searchView from './views/searchView';

//Importing the functions all the functions from the recipe-view which will allow the user to see the recipes
import * as recipeView from './views/recipeView';

//Importing the functions all the functions from the recipe-view which will allow the user to see the recipes
import * as listView from './views/listView';

import * as likesView from './views/likesView';

//Importing all the DOM elements 
import {elements, renderLoader,clearLoader} from'./views/base';



/**Global state of the website: This is the state of the website at any given time(such as what's in the cart or what is liked or not, or what are we searching up at the moment)
 * -Search object
 * -Current recipe object 
 * -Shopping list object 
 * -liked recipes object 
 * 
 */

const state = {};



//This is the actual search function that will be applied on the search bar
//Defining the controll search function rather than all the defintion being in the 
//callback function inside the event listener

//This is an async function because we need to await the promise from the API 
//as it is searching for the item
const controllSearch = async ()=> {
    //1)Get query from the view controller which will get the search query from the user input
    const query = searchView.getInput();
  // const query = 'pizza';

    //We want to create a search object
    if (query) {
        //2.Instatiate new search object and add it to the state 
        state.search = new Search(query);
        
        //3.Prepare the UI for the results 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //We are putting this under try/catch block because 
        //we want to check for the situation that the 
        //async function runs into an error
        try{
              //4.Actually get the result of the search 

        await state.search.getResults();

        //5.Show the results on the UI itself 
        //The results are actually stored on the search objects results property
        clearLoader();
        searchView.renderResults(state.search.result);


        }
        catch (error) {
            alert(error);
            clearLoader();

        }
 

    }

};


//Adding an event listener to the search button
//so everytime that I click on the submit button the page would refresh 
elements.searchForm.addEventListener('submit', e=>{
    //Now the page doesn't allow the default to happen 
    e.preventDefault();
    controllSearch();
});




//adding the event handler to the page buttons 
elements.searchResPages.addEventListener('click', e=>{
    //we are making sure the actual button is pressed 
    const btn = e.target.closest('.btn-inline');
    
    //if button exists then get the next/prev page value from the goto data value
    if (btn) {

        const goToPage = parseInt( btn.dataset.goto,10);

        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }


});

//This is the recipe controller that will display specific recipe of selected items 

const controlRecipe = async ()=> {
    //getting the hash property from the window through url
    const id = window.location.hash.replace('#', '');
    

    if (id ) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) {
             searchView.highlightSelected(id);

        }
       

        //Create new recipe objects
        //this will be inside our state object
        state.recipe=new Recipe(id);

        

        try {
            
        //get recipe data and parse the ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        //calculate the time and servings
        state.recipe.calcTime();
        state.recipe.calcServings();

        //Render the recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe,
            state.likes.isLiked(id)
            );

        }

        catch(error) {
            console.log(error);
            alert(error);

        }

    }

};



//we are adding the event listener to the window waiting for the hashchange event happens which happens 
//when you click on different items which changes the url for the hash

//adding multiple event listeners to one object through the for each loop
['hashchange', 'load'].forEach(event =>window.addEventListener(event,controlRecipe));

//This is the list controller 
const controlList = () =>{
    //create a new list if there isn't one yet 
    if (!state.list) {
        state.list = new List ();
    }

    //add each ingredient to the list 
    state.recipe.ingredients.forEach(el=> {
        const item= state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item); 
    });
}




//The event delegation of adding or deleting items from our shopping list 
elements.shopping.addEventListener('click', e=>{
    //the way closest works is that it really just finds the element that is closest
    //to what you clicked 
    //in this click it will find the id of the element you clicked on
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //This is the delete event
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);

        listView.deleteItem(id);
    }

    //handling the event when the count is updated when you delete something
    else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id,val);
    }

});

/**
 * Likes Controller
 */

 const controlLike = () =>{
     if (!state.likes) {
         state.likes = new Likes();
     }
     const currentID = state.recipe.id;

     //situation when the user hasn't liked the current recipe yet
     if (!state.likes.isLiked(currentID)) {
         //add like to the state likes array
         const newLike = state.likes.addLike(
             currentID,
             state.recipe.title,
             state.recipe.author,
             state.recipe.img
         );    

         //Toggle the likes button
         likesView.toggleLikeBtn(true);
         

         //Add like to UI List 
         likesView.renderLike(newLike);
       
    //situation when the user has already like the current recipe
     }else {
         //remove like to the state likes array
         state.likes.deleteLike(currentID);

         //Toggle the likes button
         likesView.toggleLikeBtn(false);
         //Remove like to UI List 
         likesView.deleteLike(currentID);
         
         


        
     }
     likesView.toggleLikeMenu(state.likes.getNumLikes());

 };

 //Restore liked recipes when the page finishes loading- these are likes from previous uses
 window.addEventListener('load', ()=>{
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like=>likesView.renderLike(like));
    

 });


//Handling the recipe button clicks 
//we are just handling the multiple events for the recipe controllers 
//that is why you are seeing so many if and else statements
elements.recipe.addEventListener('click', e=>{
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is clicked 
        if (state.recipe.servings >1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);

        }
        
    }else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    //so if the recipe button or any of its child elemetns are clicked     
    }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    
    }
    //in the case you click on the like button
    else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
       

});
    


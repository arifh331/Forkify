//This is the file for the Search User Interface - Essentially 
//how the user can type in a food or recipe name and results will pop-up
//onto their screen
//It will handles what happens when click on anything in the page that is related 
//to the search results 

//Importing all the DOM elements 
import {elements} from'./base';

//returns what's on the search bar itself 
export const getInput = () => elements.searchInput.value;

//This clears the current input in the search bar so its clean for the next use 
export const clearInput = () => {
     elements.searchInput.value='';
};

export const highlightSelected = id => {
    //so we are forming an array with all the dom elemetns that have the class result__link
    const resultsArr = Array.from(document.querySelectorAll('.result__link'));
    //now we are going through each of these dom elements and removing link active from them
    //this is because only one link should be active at a time so everytime we this function 
    //is activated we need to remove the other active links 
    resultsArr.forEach(el=>{
        el.classList.remove('results__link--active');

    });
    //using querry selector and turning the link to an active link which is basically 
    //the recipe we are clicking on will become active/ highlighted
    
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('result__link--active');
};

//This will clear the search results so the next results of the next search enter will have space 
//essentially clear the results list 
export const clearResults= () => {
    elements.searchResList.innerHTML="";
    elements.searchResPages.innerHTML="";
};


//we want to make sure that the recipes presented don't have their titles 
//take up too much space so we want to limit the size of the title 
export const limitRecipeTitle = (title, limit=17) =>{
    //this is the newly constructed smaller title
    const newtitle=[];
    
    //this function will basically do work if only the lenght of the function is 
    //greater than the character limit

    if (title.length > limit ) {
        //we are going to split the title into an array of its words with split
        //and then use the reduce method to count how much characters we have with 
        //included word of the title to make sur we come short of the limit
        title.split(' ').reduce((acc, cur)=>{
            if (acc+ cur.length <= limit) {
                newtitle.push(cur);
            }
            return acc+cur.length;

        },0);
        //this is the shortened title that was constructed from joining together the list of included
        //words that still fall short of the limit
        return `${newtitle.join(' ')}...`;

    }
    return title;
};


//this is a private function that renders single recipes for the user interface 
//this function is not going to be exported and is just going to be used 
//inside the renderResults functions for each loop
const renderRecipe = recipe => {

    const markup= `
                <li>
                <a class="results__link " href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                    
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
                </li>
    
    
    
    
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);

};

//this function will actually interact with the html to create the specific buttons
//the type of the button is if its actually a previous or next button 
const createButton = (page, type ) => `

                   <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page +1}>
                   <span>Page ${type === 'prev' ? page - 1 : page +1}</span> 
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
                        </svg>
                        
                    </button>

                    








`;


//this function will render the page buttons on the bottom displaying which 
//page we are currently on and also if we can go next or back
const renderButtons = (page,numResults,resPerPage) =>{
    const pages = Math.ceil(numResults/resPerPage);
    //Declaring the buttons that will be changed 
    let button;

    if (page === 1 && pages > 1) {
        //if we are only on the first page then we only want the button for the next page unless we only have one page
        button = createButton(page,'next');
        

    }
    else if (page<pages) {
        //if we are in the middle pages then we want to display both buttons for going to the next and also the previous page
        
        //we need template string that contains the button format for both prev and next buttons

        button= `
        ${createButton(page,'next')}
        ${createButton(page,'prev')}
        
        
        `;
        
    }
    else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
        //if we are in the last page then we want to display only the previous button
    }

    //add the button html to the searchresulkts pages html
    elements.searchResPages.insertAdjacentHTML("afterbegin",button);

};


//This is to export the results of the search and allow them to viewed by the user
//it takes the entire array of recipes that are returned from the search result
//we also want to to make sure we only display a certain amount of items in a page 
export const renderResults = (recipes, page =1, resPerPage=10) => {
      //this is the start of the array of results for this page
      const start= (page-1) * resPerPage;
      //this is end of the array of results for this page(remember this value actually won't be included but will be the first value for the next page)
      const end =page * resPerPage;

      //the slice method will cut up the array into subarrays 
      recipes.slice(start,end).forEach(renderRecipe);


      //now show the pagination buttons 
      renderButtons(page, recipes.length,resPerPage);
          
      

};
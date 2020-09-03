//THis file contains all the Dom elements(we are essentially going to do queryselector several times) 
//And then it will be exported to other relevant view files that may need the DOM elements 
//or just any elements that may need to frequently ascessed in the other viewing files
//this file will essentially make it easier for us to manipulate DOM because everything will be in one page


//we are going to output this object that will contain all our dom elements 
export const elements ={
    
    //This is for the search button submit itself
    searchForm: document.querySelector('.search'),
    
    //This is for the search bar input
    searchInput: document.querySelector('.search__field'),

    //this is the entire results box 
    searchRes: document.querySelector('.results'),

    //dom for search results page
    searchResPages: document.querySelector('.results__pages'),

    recipe : document.querySelector('.recipe'),

    shopping: document.querySelector('.shopping__list'),

    likesMenu:document.querySelector('.likes__field'),

    likesList:document.querySelector('.likes__list'),

    //this is the dom element for the results list
    searchResList: document.querySelector('.results__list')

};


export const elementStrings= {
    loader: "loader"
};

//This is the spinning loader that indicates that we are loading up the information 
//the parent implies which part of the DOM is using it so we might be loading up the search results
//or we maybe loading up the recipe results 
export const renderLoader = parent => {
     
    //this is the html of the loader
    const loader = `
          <div class="${elementStrings.loader}">
              <svg>
                    <use href="img/icons.svg#icon-cw"></use>
               </svg>
          </div>  
    
    
    `;
    //the parent class now has the loader added to it 
    parent.insertAdjacentHTML('afterbegin', loader);

};

//we now need a function that will take the loader off the page so its not there when its not needed 
export const clearLoader = ()=> {
    const loader= document.querySelector(`.${elementStrings.loader}`);
    
    //if loader exists, remove it 
    if (loader){
        //to remove the loader we go up to the parent than have it remove its child which what we want : the laoder 
        loader.parentElement.removeChild(loader);
    }
};


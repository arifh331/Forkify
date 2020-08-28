//Importing all the DOM elements 
import {elements} from'./base';

//importing fractional which will allow us to convert decimals to fractions for our 
//unit measurements for our units for the user interface 
import {Fraction} from 'fractional';

export const clearRecipe = () => {
   elements.recipe.innerHTML='';
};

const formatCount = count => {

    if (count) {
        //count 2.5 --> 2 1/2
        //so we are intializing two variables int, dec and they are going to be in the array. Basically 
        //our count value will be turned into a string and then we are going to split the value on the 
        //decimal point so that now in the array you have the whole number portion and the decimal view portion
        //and then map takes our array and does parseInt on these two portions which makes these two strings 
        //into ints again
        const [int, dec] = count.toString().split('.').map(el=> parseInt(el,10));
        
        //Obviously if there is no decimal portion than you don't have to be in the business of trying to convert the 
        //count into more viewer friendly format so just return the count 
        if (!dec) {
            return count; 
        };
        if (int === 0) {
            //using the fractional here
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        }
        //if int value isn't 0 you still need to covert decimal portion into fraction
        else {
            const fr= new Fraction(count - int );
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    //this is in the count is undefined value which happens very times but we are controlling for it here 
    return '?';
};
//this is a private function whose purpose is to create the html representation of each of the ingredients that will be put nade into an 
//list in the mark up html below 
const createIngredient = ingredient => `

<li class="recipe__item">
<svg class="recipe__icon">
    <use href="img/icons.svg#icon-check"></use>
</svg>
<div class="recipe__count">${formatCount(ingredient.count)}</div>
<div class="recipe__ingredient">
    <span class="recipe__unit">${ingredient.unit}</span>
    ${ingredient.ingredient}
</div>
</li>


`;

export const renderRecipe = recipe => {
    //template string containting all our recipe information
    const markup= `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings </span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el=> createIngredient(el)).join('')}
              
                   
                </ul>

                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    
    
    
    `;
    elements.recipe.insertAdjacentHTML('afterbegin',markup);
};

export const updateServingsIngredients=recipe => {
    //update counts 
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    //update ingredients 
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent=formatCount(recipe.ingredients[i].count);
        

    });

};
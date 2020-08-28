//Importing all the DOM elements 
import {elements} from'./base';

//this method will actually render the item
export const renderItem = item =>{
    const  markup= `<li class="shopping__item"> data-itemid${item.id}>
    <div class="shopping__count">
        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>

`;

//adding this new element to our shopping list
elements.shopping.insertAdjacentHTML('beforeend',markup);

}; 
//this method will actually delete the item we are talking about
export const deleteItem=id =>{
    const item= document.querySelector(`[date-itemid="${id}"]`);

    item.parentElement.removeChild(item);

};
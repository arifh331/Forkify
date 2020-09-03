//This is the model of the shopping list or cart. It is the 
//code that details what happens in the background in reguards to 
//the creation of the shopping list of ingredients
//It also details how specific caluclations are conducted

//a package that will help us create unique ids
import uniqid from 'uniqid';

//we are going to export this List object 
export default class List {
    constructor(){
        //all the items in our list will be stored in this items array 
        this.items=[];
    }
    //method for adding an item onto our list
    addItem (count, unit, ingredient){
        const item= {
            id:uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    deleteItem(id) {
        //we will use the splice method to cut out the item we want to delete from our array
        //find index method will find the index of the id of the item that matches the passed id 
        const index = this.items.findIndex(el=>el.id === id);
        //we mutate the original by cutting only 1 number from the index value which the value we wanted to delete in the first place
        this.items.splice(index,1);
    }

    updateCount(id,newCount) {
        //we go through the list of items and find the item with that id and then we can adjust the count properties
        this.items.find(el=>el.id === id).count = newCount;
    }
};
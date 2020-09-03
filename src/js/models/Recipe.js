//This is the model for the "Recipes"
//This file details what happens in the background when ingredients 
//from a recipe is manipulated and how specifically the calculations are 
//conducted


import axios from "axios";

import {proxy} from '../config';


//the recipe class is exported where new recipes objects can be instantiated from 
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //all the different attributes of this recipe such as the img url or the publisher
            this.title = res.data.recipe.title;
            this.author=res.data.recipe.publisher;
            this.img=res.data.recipe.image_url;
            this.url=res.data.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;
           //console.log(res);

        }catch(error) {
            alert(error);

        }
    }
    //this is a function to calculate the time it would take to cook the food
    calcTime(){
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng/3);


        this.time = period*15;
    }

    //this function tells the amount of servings the recipe provides
    calcServings() {
        this.servings=4;
    }



    //this is a function that will return all the ingredients into a new loop but that will 
    //have standardized ingredients
    //it will alter the ingredients within the recipe object 
    parseIngredients() {
        //array containing all the long units in a single array which we will use to see if the ingredients list need to be transformed 
        
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce', 'teaspoons', 'teaspoon','cups', 'pounds'];
        
        //array containing all the short units in a single array which contains all the short units which is what the long ingredients 
        //will be converted to

        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz','tsp', 'tsp','cup','pound'];

        const units = [...unitsShort,'kg','g'];
        //remember the map function goes throught the array and does the callback function on it 
        const newIngredients = this.ingredients.map(el=>{

            //1) Uniform the units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,i)=>{
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            //2)Remove the parenthesis
            ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');

            //3)Parse ingredients into count, unit and ingredient 
            
            const arrIng = ingredient.split(' ');
            
            //we are going through the ingredient and see if it has 
            //one of the measureing units key words
            const unitIndex= arrIng.findIndex(el2=> units.includes(el2));
            
            let objIng;
            
            //Situation one of the specifc units are actually present
            if (unitIndex >-1) { 
                
                //Ex. 4 1/2 cups , arrCount is [4, 1/2]
                //ex 4 cups, arrCount is [4]
                const arrCount =arrIng.slice(0,unitIndex);

                let count;
                if (arrCount.length === 1) {
                    //if there is only one element in the arrcount which means that there is only one number then the count is just that number 
                    //sometimes the units numbers are seperated by a dash - so in this cases the dash will be replaced by a plus and then that will be 
                    count = eval(arrCount[0].replace('-','+'));
                }
                else {
                    
                    //so im essentially going to turn [4,1/2] into "4+1/2" and then eval function will just excute 4+1/2 as if its regular JS code
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                
                //constructing the objing that will be returned
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient :arrIng.slice(unitIndex+1).join(" ")
                };

            } 
            //there is no unit but first element is a number
            else if (parseInt(arrIng[0],10)) {
                
                //the object will contain the number value but it won't contain any specifc units of measurement 
                //like cups or ounces and the final string will be the array excluding the first index because that 
                //is the number value 
                objIng = {
                    count : parseInt(arrIng[0],10),
                    unit : '',
                    ingredient: arrIng.slice(1).join(" ")
                }

            }
            //if there is no numbers then the above statement will be false 
           
            //in the case there is no units values
            else if (unitIndex == -1) {
                
                //in this case where there are no number values or specific units we just make the obj to have the original ingredient 
                objIng = {
                    count :1,
                    unit : "",
                    ingredient
                }
                
            }


            //this is how the map method works you have to return something 
            return objIng;



        });




        //now the ingredients of the recipe object is our new ingredients list 
        this.ingredients = newIngredients;
    }
        //this method will increase or decrease the ammount of servings 
        //and the ingredients will have to reflect this change
        //the type is basically if we are increasing or decreasing 
        updateServings (type) {
            //servings
            const newServings = type === 'dec' ? this.servings - 1 : this.servings +1;

            //Update the ingredients 
            this.ingredients.forEach(ing =>{
                ing.count *=(newServings/this.servings);
            });

            
            this.servings = newServings;


        }
};
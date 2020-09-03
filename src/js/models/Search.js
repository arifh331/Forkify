//This is the model for the search functionality. This is not code for what the 
//user visualizes but what happens in the back when the user searches for items
//and how the results are reached

import {proxy} from '../config';


//Importing the axios package that was installed through npm
//Axios is preferred over fetch because fetch may not be supported in older browsers 

import axios from 'axios';


//if you would like to export one thing write 
// export default
export default class Search {
    constructor(query) {
        this.query= query;
    }
    async getResults() {
        
        //orginal food2fork api was down so this is the new api that was created
        //Wrap around try/catch block 
        try{
        //when we try to pass the query to function we dont need to specify in the parameter because the object 
        //itself will have a query variable or property     
         const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
         this.result= res.data.recipes;
        // console.log(this.result);
        }catch(error) {
            alert(error);
        }
        
     
     }
};




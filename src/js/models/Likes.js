//This is the model for the Likes and it details how Likes 
//work and how the Likes list work. It also goes through how 
//spefically likes are added or deleted or referenced for the Likes List

export default class Likes {
    constructor() {
        //so this array will have all the recipes you have liked
        this.likes = [];

    }

    addLike(id,title,author, img) {
        //creating the like object so setting the parameters
        const like = {id,title,author,img};
        this.likes.push(like);

        //Make sure the likes persist even if you refresh
        this.persistData();
        return like;
    }

    deleteLike(id) {
           //we will use the splice method to cut out the item we want to delete from our array
        //find index method will find the index of the id of the likes that matches the passed id 
        const index = this.likes.findIndex(el=>el.id === id);
        //we mutate the original by cutting only 1 number from the index value which the value we wanted to delete in the first place
        this.likes.splice(index,1);

        //Persist data in local storage 
        this.persistData();

    }
    //so if we are looking at a recipe we see if it has already been liked or not 
    isLiked(id) {
        //so if its not there it would be -1 so we are checking if it is there or not 
        return this.likes.findIndex(el=> el.id ===id ) !== -1 ;

    }
    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage =JSON.parse(localStorage.getItem('likes'));

        //so we are taking the likes from our local storage and restoring it 
        //for the use of our likes menu
        if (storage){
            this.likes= storage;
        }
    }
};
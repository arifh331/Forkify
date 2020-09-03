# **Forkify**

Forkify is a recipe-search Web-Application. It allows you to search for recipes for variations of popular foods and details the ingredients you would need for such a recipe!

# **Motivations**

This web-application is in part a practice in all the skills and techniques that would be required in the production of a fun Web Application! Particularly I was making sure I knew how to connect to the specific API and pull information from it. I was also testing my knowledge of ES6 JavaScript and Asynchronous JavaScript particularly in reference to making AJAX calls.

# **Before You Start**

There are some tools you will need to have installed in your computer before you can use this application. You will need Node.js and NPM(this should come with the Node.js installation). WebPack is also needed as a Dev Dependency and Babel is also needed as Dev Dependency. Several other Web Dependencies and Dependencies are required for the application. A simple way to get all the particulars installed is using npm install which would install all the dependencies listed in the package.JSON file. Simple navigate to the directory of the project with your terminal/shell and then type &quot;npm install&quot; (without the quotation marks). If you node.js and npm are already installed then you should acquire all the dependencies that are needed. Everytime you want to use the application you will need to build it. Thus you need to enter in the commands

&quot;npm run build&quot;

&quot;npm run start&quot;

Enter these commands one after the other(without the quotes of course) and your application should start.

# **How To Use**

Before you start the application remember to navigate to the directory and build and start the application. The commands you need to run are

&quot;npm run build&quot;

&quot;npm run start&quot;

Now your application should start!

The application is actually quite intuitive. You simply type in the food or recipe into the search bar like you would in any search engine. After you click enter you will get results on the left- it will be a list of recipes regarding the food you typed and you will have the ability to scroll up or down this list.

If you click on any of the recipes, the page will now display the particular recipe, ingredients and all other information related to it.

You will also have the option &quot;like&quot; a recipe which would place the recipe into a Likes list which will be displayed if you hover over the red heart on the right hand corner. The red heart will only be visible if you had already liked at least one recipe. In the Likes list, you can click on any of the recipes you had previously liked to go to that recipe where you can interact with it.

You also have the option to add all the listed ingredients of the recipe onto a shopping cart if you click on the &quot;Add to Shopping List&quot; button near the bottom of the page when looking at a recipe. This will start a shopping cart to the right where you can manipulate the ingredients to your needs.

In the very bottom, you have the option to click on the &quot;Directions&quot; button which will send you to the page where the recipe was originally posted. The instructions for the recipe are here!

There are definitely a lot of other features I want to add but for now have fun trying this out!!

# **API Referenced**

The API referenced for this project is

[https://forkify-api.herokuapp.com/](https://forkify-api.herokuapp.com/)

It contains the instructions on how to use the API

I also used [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/)

To enable cross-origin requests without trouble

const path =require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
module.exports= {
    //Where webpack will start the bundling
    //the babel will polyfill everything it cant convert back to ES5
     entry: ['babel-polyfill','./src/js/index.js'],
     
     //where to save our bundle file
     output: {
         //this is an absolute path
         path: path.resolve(__dirname,'dist'),
         filename: 'js/bundle.js'
     },
     devServer: {
         //this is where the produced project will be stored. The source code is actually in the src folder where it is developed
         contentBase : './dist'
     },
     plugins :[
         //will copy the index.html file on the src folder onto the dist folder with the script tag 
         new HtmlWebpackPlugin({
             filename:'index.html',
             template: './src/index.html'
         })
     ],
     module: {
         //these are the loaders 
         rules:[
             {   
                 //locate all the javascript files by looking at the ends js 
                 test: /\.js$/,
                 //we want babel to not convert all the js files inside the node modules folder
                 exclude: /node_modules/,
                 //now excute using the babel loader
                 use: {
                     loader: 'babel-loader'
                 }

             }
         ]
     }
     
    
};
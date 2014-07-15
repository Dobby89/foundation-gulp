Foundation 5 - Gulp Template
============================

A basic template for Foundation 5, which uses Gulp to process assets from  ```./src``` into ```./dist```, via the bower components which make up Foundation.

Also includes [Foundation's iconfont](https://github.com/zurb/foundation-icon-fonts).

* Compiles and concatenates Foundation's Sass files, Foundation's iconfont and your own Sass files into a single ```./dist/css/style.css``` 
* Concatenates Foundation's JavaScript and your own JavaScript into ```./dist/js/all.js```

##Setup
=======

###Step 1
Run ```npm install``` to install all the Node and Gulp plugins.

###Step 2
Run ```bower install``` to install all the bower components for Foundation.

###Step 3
Run ```gulp``` to compile Sass into style.css and concatenate all JS into all.js and 
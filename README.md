#TestEtsy - Technical Document (Velocity Partners Exam)

#### 1 - Introduction

This project was designed using the javascript's module pattern and implemented as singles modules which are loaded inside index.html. It also uses gruntJS (Javascript Task Automater http://gruntjs.com/) which runs a simple server using grunt-connect - https://github.com/gruntjs/grunt-contrib-connect - (I don't need to use a XAMPP/WAMP any more!) and uses jshint for a clean code with an identation of 2 and all other jshint features (https://github.com/gruntjs/grunt-contrib-jshint). In order to start using it you should run:

* npm install grunt-cli --save-dev
* npm install

And to run the server:

* grunt server

After you did this, your default browser should be triggered and show the app working.

Note: Please contact me if you are in troubles running the grunt server.

#### 2 - Development 

In order to show the javascript level, I decided to make a simple framework-oriented approach. This is why I developed an util.js file which handles every object inside the main.js file.

This approach is based on backbone.js which is the framework that I have used for at least 1 year. There's an object called ui which is the responsible of get the jquery object of every selectors used in the DOM. 

I also defined an events object which match an [event] [selector] : [method] so we have an object that handles every methods inside the main app.

Note: Every method has its own documentation on top to be more clear of what's intended to do.

#### 3 - Compatibility 

It's compatible with IE9+, Chrome, FF, Safari

@Author:
Sebastian Battistelli - sebastianbattistelli@gmail.com

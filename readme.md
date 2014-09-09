# uoftdev-web-bootcamp

In order to build and run this, ensure you have [Node.js (with npm)](http://nodejs.org/download/) installed on your system.

This project uses a basic Express web server and a Gulp build environment. Note that much of the minification I'd normally put in Gulp has removed -- this is based on [gulp-breakout](https://github.com/connor4312/gulp-breakout). No reason to eat 200 mb of disk space for stuff that isn't needed :)

### Usage:

 1. cd into the project folder
 2. Only once: run `npm install && bower install && gulp`.
 3. Copy `config.example.js` to `config.js`, and change details as desired.
 3. Run `npm start` to boot the server. By default it is accessible on http://localhost:3000.

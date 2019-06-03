// Require .emv file
require("dotemv").config();
//Require request
let request = require('request'); 
//Require moment
const moment =  require('moment');
//Require File System
const fs = require('fs');
//Link keys page
const keys = require('./keys.js');
//INTILIAZE SPOTIFY
const spotify = require('node-spotify-api');
const spotify = new spotify('keys-spotify');

//OMDB AND BANDS IN TOWN API'S
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

//TAKE USERS COMMAND AND INPUT
let userInput = process.argv[2];
let userQuery = procss.argv.slice[3].join('');

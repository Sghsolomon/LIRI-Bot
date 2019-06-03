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

//APP LOGIC
function usercommand(userInput, userQuery){
    //Make a decesion based on the command
    switch(userInput){
        case  "concert-this":
        concertThis();
        break;
        case "spotify-this":
            spotifyThisSong();
            break;
            case "movie-this":
            movieThis();
            break;
            case "do-this":
                doThis(userQuery);
                break;
                default:
                    console.log("I don't understand");
                    break;
    }

}
usercommand(userInput, userQuery);

function concertThis(){

}
function spotifyThisSong(){

}

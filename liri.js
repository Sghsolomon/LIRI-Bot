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
    console.log(`\n-----------\n\ SEARCHING FOR.....${userQuery}'s next show...`);
    //Use request as out query URL using our user query variable as the parameter of our search
    request("https://rest.bandsintown.com/artists/") + userQuery + "/events?app_id=" + bandsintownresponse, body
//If there is no errow give us a 200 status code (everything ok!)
if(error && response.statusCode === 200){
    // capture data and use json to format
    let userBand = json.parse(body);
    // parse data and use for loop to access paths to data
     if(userBand.length > 0){
         for(i = 0; i < 1; i++){
             //console desired data using E6 syntax
             console.log(`\ that is for you ..\n\Artist:${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude}, ${userBand[i].venue.longitude} \nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`) 
         //Moment.js to format the date MM/DD/YY
         let concertDate = moment(userBand[i].datetime).format("MM/DD/YY hh:00 A");
         console.log(`Date and Time: ${concertDate}\n\n--- `);
            };

     } else{
         console.log('band or concert not found');
     }
     }
}

function spotifyThisSong(){

}

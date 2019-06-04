// Require .emv file
require("dotemv").config();

//Link keys page
 var keys = require("./keys.js");

//INTILIAZE SPOTIFY
var spotify = require("node-spotify-api");

//Require axios
var axios = require("axios");

//Require File System
var fs = require('fs');

//Require moment
var  moment =  require('moment');

//variables for the argument to be entered by he user in Liri
var appCommand = process.argv[2];
//console.log("appCommand: " + appCommand);
//use the slice method to account for user's search starting with index[3] 
//position forth becouse search could have slice 
var userSearch = process.argv.slice(3).join("");
//console.log("userSearch: " + userSearch);


//using switch statment to execute the code appropriate to the appCommand that is inputed from the user 
function liriRun(appCommand, userSearch){
    switch(appCommand){
        case "spotify-this-song":
            getSpotify(userSearch);
            break;

            case "concert-this":
            getBandsInTown(userSearch);
            break;

            case "movie-this":
            getOMDB(userSearch);
            break;

            case "do-what-it-says":
            getRandom();
            break;
//if appCommand is left blank, return a default message to user
           default:
               console.log("please enter one of the following command: 'concert-this', 'spotify-this-song' ")
    }

};

//function to search spotify-api
function getSpotify(songName){
    // variables for the sectet ids for spotify
    var spotify = new spotify(keys.spotify);

    //console.log("spotify key: " + spotify);
    if (!songName){
        songName = "the sign";
    };

    //console.log("songName if not a song name: " + songName);
    spotify.search({type: 'track', query: songName}, function(err, data){
        if(err){
            return console.lof('err occured: ' + err);
        }
        //console.log("data for searched song: " + data.track.item[0]);
        //adding a line break for clarity of when search results begin
        console.log("===================");
        //return artists(s)
        console.log("Artist(s) Name:  " + data.tracks.item[0].album.artists[0].name + "\r\n");
        //return the song's name 
        console.log("song name: " + data.tracks.item[0].name + "\r\n");
        //return a preview link of the song from spotify 
        console.log("song preview link: " + data.tracks.item[0].href + "\r\n");
        //return the album that the song is from 
        console.log("Album: " + data.tracks.item[0].album.name + "\r\n");
        //Append text in to log.text file
        var logSong = "====begin spotify log entry====" + "\nArtist: " + data.tracks.item[0].album.artists[0].name + "\r\n";

        fs.appendFile("log.txt", logSong, function(err){
            if(err) throw err;
        });

        //log results data
     

    });
};

// -----function to search bands in town API
function getBandsInTown(artist){
    var artist = userSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "events?app_id=codingbootcamp"
    axios.get(bandQueryURL).then(function(response){
        //adding a line break for clarity of when search results begin
        console.log("=======================");
        //console.log(response);
        console.log("name of the venue:  " + response.data[0].venue.name + "\r\n");
        console.log("venue location: "  + response.data[0].venue.city  + "\r\n");
        console.log("date of event:  " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");

        //append text in to log.txt file 
        var logConcert = "=====begin concert log Entry========" + "\nName of the musician: " + artist + "\nName of the venue:";

        fs.appendFile("log.txt", logConcert, function(err){
            if(err) throw err;     
        });
        //log Results(response)
    });
};

//-----Function to search OMDB API
function getOMDB(movie){
    //console.log("Movie:  " + movie);
    //if the user doesn't type a movie in, the program will output data for the movie 'Mr, Nobady.'
    if(!movie){
        movie = "Mr, Nobody";
    } 
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log("movieQueryUrl");
    axios.request(movieQueryUrl).then(function(response){
        //console.log(resoponse.data);
        //adding a line break for clarity of when search result begin
        console.log("==========================");
        console.log("* Title: " + response.data.Title  + "\r\n");
        console.log("* Year Released: " + response.data.year  + "\r\n");
        console.log("* IMDB Rating: " + response.data.imdbRating  + "\r\n");
        console.log("* Rotten Tomatoes Rating: " + response.data.Rating[1].value  + "\r\n");
        console.log("* Country Where Produced: " + response.data.Country  + "\r\n");
        console.log("* :Language " + response.data.Language  + "\r\n");
        console.log("* Plot: " + response.data.Plot  + "\r\n");
        console.log("* Actors: " + response.data.Actors  + "\r\n");

        //logResults(response);
        var logMovie = "======Begin Movie Log Entry========" + "\nMovie title: " + response.data.Title + "\nYear released:";
        fs.appendFile("log.txt", logMovie, function(err){
            if(err) throw err;
        });

    });
};
//using the fs Node package. LIRI will take the text inside of random.txt and then use it to call one of LIRI command
//FUNCTION RANDOM 
function getRandom(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        } else{
            console.log(data);
            var randomData = data.split(",");
            liriRun(randomData[0], randomData[1]);
        }
        //console.log("\r\n" + "Testing:  " + randomData[0]  + randomData[1]);


    });
};


//Function to log result from the other functions
function logResults(data){
    fs.appendFile("log.txt", data, function(err){
        if(err) throw err;
    });
};

liriRun(appCommand, userSearch);
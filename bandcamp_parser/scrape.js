const bcfetch = require('bandcamp-fetch');

//dunno if this works
bcfetch.cache.setTTL('page', 500);
bcfetch.cache.setMaxPages(20);

//get random interval
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
const rndInt = randomIntFromInterval(1, 20)

//define what you want and which page 
const params = {
    genre: process.argv[2],
    subgenre: process.argv[3],
    page: rndInt
}

//get results and store in file
var fs = require('fs');

bcfetch.discover(params).then( results => {
    var json = JSON.stringify(results);
    fs.writeFile("/home/heopd/bandcamp-player/bandcamp_parser/albums.json", json, function(err) {
        if (err) {
            console.log(err);
        }
    });
});

bcfetch.cache.clear('constant');


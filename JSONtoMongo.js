'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

var listingData;

const connectionLink = config.db.uri;
mongoose.connect(connectionLink, {useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
  beginAdding();
});

var beginAdding = function() {
  fs.readFile('listings.json', 'utf8', function(err, data) {

    //saving data in listingData 
    listingData = JSON.parse(data); 

    listingData.entries.forEach(function(listings) {
      new Listing({ 
        name: listings.name,
        code: listings.code,
        coordinates: listings.coordinates,
        address: listings.address        
      }).save(err)
        if(err){
          console.log("Error adding listing value");
        }
      });

      console.log("All added!");
  });
};
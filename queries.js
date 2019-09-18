const mongoose = require('mongoose');
const config = require('./config');
Listing = require('./ListingSchema.js');

//connecting to mongoBD
const connectionLink = config.db.uri;
mongoose.connect(connectionLink, {useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  Listing.find({ name: 'Library West'}, function (err, listings) {
    if (err) return handlerror(err);

    console.log(listings);
  });
};

var removeCable = function() {
  Listing.findOneAndDelete({ code: 'CABL'}, function (err, listings) {
    if (err) return handlerror(err);

    console.log(listings);
  });

};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  Listing.findOneAndUpdate({ name: 'Phelps Laboratory'}, {address: '1953 Museum Rd, Gainesville, FL 32603' }, function (err, listings) {
    if (err) return handlerror(err);

    console.log(listings);
  });

};
var retrieveAllListings = function() {
  Listing.find(function (err, listings) {
    if (err) return handlerror(err);

    console.log(listings);
  });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
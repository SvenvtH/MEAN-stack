// import and use mongodb.MongoClient
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbConnectionUrl = 'ENTER_DB_CONNECTION_KEY_HERE';

function initialize(dbName, successCallback, failureCallback) {
	MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
		if (err) {
			console.log(`[MongoDB connection] ERROR: ${err}`);
			failureCallback(err);        // this should be "caught" by the calling function
		} else {
			const dbObject = dbInstance.db(dbName);


			console.log("[MongoDB connection] SUCCESS");
			successCallback(dbObject);
		}
	});
}

module.exports = { initialize };

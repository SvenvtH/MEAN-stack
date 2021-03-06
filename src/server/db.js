// import and use mongodb.MongoClient
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbConnectionUrl = 'mongodb://admin:1q2w3e4r@handigjoh-shard-00-00-ksexg.azure.mongodb.net:27017,handigjoh-shard-00-01-ksexg.azure.mongodb.net:27017,handigjoh-shard-00-02-ksexg.azure.mongodb.net:27017/test?ssl=true&replicaSet=HandigJoh-shard-0&authSource=admin&retryWrites=true&w=majority';

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

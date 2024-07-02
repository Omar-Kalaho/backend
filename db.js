const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://omarkalaho:mV5vz1VAY7RAMAwR@cluster1.mmhys42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const databaseName = "ScienceProject";
let mongoClientInstance = null;

// Setting the maximum pool size for the connection pool.
let maxPoolSize = 10;

// Object of connection Option
const connectionOption = {
    maxPoolSize: maxPoolSize
}

async function connectToDb() {
    if (!mongoClientInstance) {
        try{
        mongoClientInstance = await client.connect(uri, connectionOption);
        console.log("Database Connected Successfully")
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    // returning a reference to the database
    return mongoClientInstance.db(databaseName);
}

module.exports = { connectToDb };
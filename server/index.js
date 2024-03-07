//#region Setup, Database Creation, App Creation
const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;
// get
app.get("/api", (req, res) => {
  res.json({ message: "Node.js server says hi to React Frontend!" });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  })
};

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://LanguageMaster:BabelCS320@languagemastercluster.5xln7py.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMasterCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Node.js backend is connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//#endregion
module.exports = app;







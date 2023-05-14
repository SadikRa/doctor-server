const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


// doctor
// Nx86ty0evFxRsNSK



const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.ywq3nhp.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://doctor:Nx86ty0evFxRsNSK@cluster0.ywq3nhp.mongodb.net/?retryWrites=true&w=majority";

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

    const servicesCollection = client.db('doctor').collection('users')


    app.get('/services', async(req, res) =>{
        const cursor = servicesCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    app.post('/services', async(req, res) =>{
        const services = req.body;
        const result = await servicesCollection.insertOne(services)
        res.send(result)
    })

    app.delete('services/:id', (req, res) =>{
        
    })

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/' , (req, res) => {
    res.send('doctor server is running')
})

app.listen(port, () =>{
    console.log(`server doctor is running ${port}`)
})
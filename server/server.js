const express = require('express');
const bodyParser =  require('body-parser');
const OpenAI = require('openai'); // Import OpenAI modules
const {MongoClient,ServerApiVersion} = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAdFldcZj3W1J8ufGHRpeBccpaAa-OXgB0");
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const password = "Navya#1427";
const enpassword = encodeURIComponent("Navya#1427");
const uri = `mongodb+srv://trickerbaby:${enpassword}@cluster0.rq5ucba.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    console.log("welcome to murli server")
    res.send("welcome to mulri");
})


app.get('/sendmessage',async (req,res)=>{

    const msg  = req.query.message;
    const username = req.query.username;
    const lang = req.query.language;

     const genAI = new GoogleGenerativeAI("AIzaSyAdFldcZj3W1J8ufGHRpeBccpaAa-OXgB0");

      async function run() {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      
        const prompt = `Acting as lord krishna,Give a solution to this problem ${msg} give references on basis of bhagwat geeta incidents,give output in form of a letter,And my name is ${username},Please reply in simple ${lang} language , do not use hard to understand words,reply in 300 words to this quary`
      
        const result = await model.generateContent(prompt); 
        const response = await result.response;
        const text = response.text();
        res.json({letter:text});
      }

      run();

      console.log("AI request processed");
      
      console.log(username+":"+msg);
      console.log(username+":"+letter);
      res.json({letter});

})

app.listen(3003,()=>{
    console.log("Server started at 3003");
})

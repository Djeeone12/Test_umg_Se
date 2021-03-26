const express = require('express');
const morgan =require('morgan');
const axios = require('axios');
//Usingpackages 
const app = express();


// create Port for Heroku
let port = process.env.PORT||8080
 
// Middleware to read json objs
app.use(express.json()) 
app.use(morgan('dev'));
// Routes to acces the root directory of the API
app.get('/', (req, res) => {
    res.send("<h1> Djee one </h1>");
})

// Route to test a json response
app.get('/test', (req, res) => {
    res.json({
        prop1: "hello",
        prop2: "world"
    })
})

// POST Routes
app.post('/post', (req, res) => {
    console.log(req.body);
   // aux =req.body.prop1
res.send(`Received:  ${aux},  ${req.body.prop2}`);
})
 // Testing for axios APIS
app.get('/rick',(req,res) => {
    const END_POINT  ='https://rickandmortyapi.com/api/character';

    axios.get(END_POINT)
    .then(function (response) {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error) {
        console.log(error);
        res.send(error);
    });

})

// Testing for axios APIS
// Using param
app.get('/rick/:id',(req,res) => {
    const END_POINT  =`https://rickandmortyapi.com/api/character/${req.params.id}`;

    axios.get(END_POINT)
    .then(function (response) {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error) {
        console.log(error);
        res.send(error);
    });

})

// Listen Server
app.listen(port, () => {
    console.log("Server running on port " + port);
});
const express = require('express');
const morgan =require('morgan');
const axios = require('axios');

//Usingpackages 
const app = express();
//
domain =undefined;
// create Port for Heroku
let port = process.env.PORT||9000

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
app.post('/invitacion', (req, res) => {
   
    const END_POINT  ='https://api.linkedin.com/v2/invitations'
   // console.log(req);
    res.send({
        "invitee":"urn:li:email:gadjee@linkedin.com",
        "message":{
            "com.linkedin.invitacion.InvitacionMessage":{
                "body":"Let's connect"
            }
        }

    });
    axios.get(END_POINT)
    .then(function (response) {
      //  console.log(response.data)
       
    })
})


 // Testing for axios APIS
 app.get('/invitacion/{invitation Urn} ',(req,res) => {
    const END_POINT  ='https://api.linkedin.com/v2/invitations/{invitation Urn}';

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
//var axios = require('axios');
app.get('/pending',(req,res) => {
  
    const END_POINT  ='https://api.linkedin.com/v2/invitations?q=invitee&states=PENDING';
    
var config = {
  method: 'get',
  url: 'https://api.linkedin.com/v2/invitations?q=invitee&states=PENDING',
  headers: {
      'content-Type': 'application/json',
      'Accept' : 'application /json',
      'Authorization':'undefided'
  }
}
});

// Listen Server
app.listen(port, () => {
    console.log("Server running on port " + port);
});
const express = require('express');
const morgan =require('morgan');
const axios = require('axios');
var Linkedin = require('node-linkedin')('app-id', 'secret'); // Get app-id + secret from your LinkedIn developer account

//Usingpackages 
const app = express();
//
domain =undefined;
// create Port for Heroku
let port = process.env.PORT||9000



// Middleware to read json objs
app.use(express.json()) 
app.use(morgan('dev'));
// call back for access token
app.get('/callback', async (req, res) => {
    if(!req.query.code) {
        res.redirect('/');
        return;
    }
    try {
        const data = await API.getAccessToken(req);
        if(data.access_token) {
            req.session.token = data.access_token;
            req.session.authorized = true;
        }
        res.redirect('/');
    } catch(err) {
        res.json(err);
    }
});
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
// Second route for POST 
app.post('service/action', (req, res) => {
   
    const END_POINT  ='https://api.linkedin.com/v2/{service}?action={actionName}'
   // console.log(req);
    res.send({
      
    });
    axios.get(END_POINT)
    .then(function (response) {
      //  console.log(response.data)
       
    })
})
// 3 route for POST 
app.post('service/{Request Body}', (req, res) => {
   
    const END_POINT  =' https://api.linkedin.com/v2/{service}/{Request Body}'
   // console.log(req);
    res.send({
      
    });
    axios.get(END_POINT)
    .then(function (response) {
      //  console.log(response.data)
       
    })
})
//post Publish

 // Testing for axios APIS
 app.get('/invitacion/{invitation Urn} ',(req,res) => {
    const END_POINT  ='https://api.linkedin.com/v2/invitations/{invitation Urn}';
    headers: {
  
    }

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
      
  }
}
});
app.get('/accepted',(req,res) => {
  
    const END_POINT  ='GET https://api.linkedin.com/v2/invitations?q=inviter&states=ACCEPTED';
    
var config = {
  method: 'get',
  url: 'GET https://api.linkedin.com/v2/invitations?q=inviter&states=ACCEPTED',
  headers: {
    
        "elements": [
          {
            "validationToken": "gFulHMKt",
            "created": 1485388767467,
            "inviter": "urn:li:person:Ylpq-RobP9",
            "id": "urn:li:invitation:6230172048157614080",
            "state": "PENDING",
            "lastModified": 1485388791605,
            "sentAt": 1485388791605,
            "message": {
              "string": "invite_member_28"
            },
            "invitee": "urn:li:person:RT7VAAk2nr"
          },
          {
            "validationToken": "54aKoD6Q",
            "created": 1485379397914,
            "inviter": "urn:li:person:Ylpq-RobP9",
            "id": "urn:li:invitation:6230132749475291136",
            "state": "PENDING",
            "lastModified": 1485379412806,
            "sentAt": 1485379412806,
            "message": {
              "com.linkedin.invitations.InvitationMessage": {
                "body": "Connect with me!"
              }
            },
            "invitee": "urn:li:person:r5GpfvpA3t"
          },
          
        ],
        "paging": {
          "total": 5,
          "count": 10,
          "start": 0
        }
      
    }

}
});

app.get('/inviter/invitee ',(req,res) => {
    const END_POINT  ='https://api.linkedin.com/v2/invitations//urn:li:invitation:123456789?projection=(created,inviter~person(firstName,lastName,headline)~emailAddress(emailAddress)~phoneAccount(phoneNumber),id,state,lastModified,sentAt,message,invitee~person(firstName,lastName,headline)~emailAddress(emailAddress)~phoneAccount(phoneNumber))';
    

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
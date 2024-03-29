//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post('/', function(req, res){
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  console.log(name, surname, email);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: surname,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/833f360896",
    method: "POST",
    headers: {
      "Authorization": "somestring 65c07421dce83612b86705140daa5f63-us5",
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post('/failure', function(req, res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server listening on port 3000");
});

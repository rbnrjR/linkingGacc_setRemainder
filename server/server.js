const express = require('express')
    , app = express()
    , server = require('http').Server(app)
    , path = require('path')
    , oauth = require("oauth").OAuth2
    , google = require('googleapis')
    , calendar = google.calendar('v3')
    , OAuth2Client = google.OAuth2Client
    , OAuth2 = google.auth.OAuth2
    , JWT    = require('jsonwebtoken')
    , gfunction = require('./gfunction.js')
    , storeToken = require('./storeToken.js');

var clientId = '616007233163-g0rk4o8g107upgrmcuji5a8jpnbkd228.apps.googleusercontent.com'
  , clientSecret = 'h0DIE4B8pncOEtgMfK2t9rcr'
  , redirect = 'http://localhost:3000/oauth2callback'
  , calendar_auth_url = ''
  , oauth2Client = new OAuth2(clientId, clientSecret, redirect)
  , calendar_auth_url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
    });

app.get('/', function(req, res) {
    // console.log("got a request");
    //res.send("Got");
    res.sendFile(path.resolve(__dirname + "/../index.html"));
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log(req.body, "this si the body of request");

    next();
});

app.get('/index.js', function(req, res) {
    //console.log("got a request");
    res.sendFile(path.resolve(__dirname + "/../index.js"));
});

app.get('/oauth2callback', function(req, res) {
  var code = req.query.code;
  console.log(code);
  oauth2Client.getToken(code, function(err, token){
    let Token = token;
    let AccessToken = token.access_token;
    let RefreshToken = token.refresh_token;
    console.log('Token : ',Token);
    console.log('AccessToken : ', AccessToken);
    console.log('RefreshToken : ', RefreshToken);
    storeToken(token, function(err){
      console.log(err);
    });
  });
  res.redirect('http://localhost:3000/#/dashh');
  console.log("succesfully redirected");
});

// app.get('/middlepath', function(req, res){
//   console.log("inside middlepath in express");
//   res.redirect('http://localhost:3000/#/dash')
// });

app.get('/createEvent', function(req, res){
  let summary = req.query.summary;
  let location = req.query.location;
  console.log('summary', summary);
  console.log('location', location);
  gfunction(oauth2Client, summary, location);
  res.redirect('http://localhost:3000/#/eventCreated');
  //console.log('evennnnnnnnnnntttttttttttttttt : ',gfunction.event.htmlLink);
});

app.get('/eventCreated', function(req, res){
  res.send('Event Created !!!');
});

server.listen(3000, function() {
    console.log('server started on  3000');
});

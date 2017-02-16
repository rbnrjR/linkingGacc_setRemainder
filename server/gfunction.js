module.exports = function(oauth2Client, summary, location){
  var fs = require('fs')
    , readline = require('readline')
    , storeToken = require('./storeToken.js')
    , google = require('googleapis')
    , calendar = google.calendar('v3')
    , OAuth2 = google.auth.OAuth2;

  var SCOPES = ['https://www.googleapis.com/auth/calendar'];
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
  var clientId = '616007233163-g0rk4o8g107upgrmcuji5a8jpnbkd228.apps.googleusercontent.com'
    , clientSecret = 'h0DIE4B8pncOEtgMfK2t9rcr'
    , redirect = 'http://localhost:3000/oauth2callback';

  var oauth2Client = new OAuth2(clientId, clientSecret, redirect);

  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      createEvent(oauth2Client, summary, location);
    }
  });

  function getNewToken(oauth2Client, callback) {
    oauth2Client.refreshAccessToken(function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  }

  function createEvent(auth, summary, location) {

    var event = {
      'summary': summary,
      'location': location,
      'description': 'A Chance to get to know more about the product.',
      'start': {
        'dateTime': '2017-02-23T23:40:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2017-02-24T05:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'},
      ],
      "reminders": {
        "useDefault": "useDefault",
        // # Overrides can be set if and only if useDefault is false.
        // "overrides": [
        //     {
        //       "method": "reminderMethod",
        //       "minutes": "reminderMinutes"
        //     },
        //     # ...
        // ]
      }
    };

    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.htmlLink);
    });
  }

  function listEvents(auth) {
    var calendar = google.calendar('v3');
    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var events = response.items;
      if (events.length == 0) {
        console.log('No upcoming events found.');
      } else {
        console.log('Upcoming 10 events:');
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          console.log('%s - %s', start, event.summary);
        }
      }
    });
  }
}

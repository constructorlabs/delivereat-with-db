
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'ACabafbc79c1c76c070ea7300972ef7e05';
const authToken = 'd3e4758f3da08a0e569c8355712fd333';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+447447980922',
     to: '+447490095780'
   })
  .then(message => console.log(message.sid))
  .done();

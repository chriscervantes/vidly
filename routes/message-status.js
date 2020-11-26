
const accountSid = 'AC6ca720bba9eea21a7c6a237bc6c1a513';
const authToken = '9d324972b95f5b21a9e78808cc7cb115';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         body: 'Sample text',
         from: '+15395891505',
         statusCallback: 'https://vidlycervantes.herokuapp.com/api/messageStatus',
         to: '+61413965813'
       })
      .then(message => console.log(message.sid));
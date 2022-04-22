# npm-aruba-sms-sender

This package is used as wrapper for aruba SMS API.
Implementation is simple as stand-up and sit on a chair.

Follows an example:
```javascript

var sender = require('aruba-sms-sender')

const USER = process.env.ARUBA_SMS_USER;
const PASSWORD = process.env.ARUBA_SMS_PASSWORD;

const recipients = [];

// Alice
recipients.push('+3933456789')
// Bob
recipients.push('3456789')
// Charlie
recipients.push(3456789)

sender.sendSMS(USER, PASSWORD, recipients, 'Hello World', 'CUSTOM SENDER NAME');

```
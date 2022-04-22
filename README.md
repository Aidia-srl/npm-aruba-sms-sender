# npm-aruba-sms-sender

This package is used as wrapper for aruba SMS API.
The implementation is as simple as standing-up and sitting on a chair.
## Usage
``npm i -S aruba-sms-sender``

## Example:
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
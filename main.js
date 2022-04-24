const axios = require('axios');

var BASEURL = 'https://smspanel.aruba.it/API/v1.0/REST/';
var MESSAGE_HIGH_QUALITY = 'N';

/**
 * Authenticates the user given it's username and password and returns
 * either the auth object containing the user_key and session_key or null if an error occurred.
 * @param {String} username Username as String.
 * @param {String} password Password as String.
 * @returns {Promise} Either the auth object containing the user_key and session_key or null if an error occurred.
 */
async function _login(username, password) {
  try {
    const res = await axios.get(
      BASEURL + 'login?username=' + username + '&password=' + password
    );
    if (!!res && res.status == 200) {
      var auth = res.data.split(';');
      return {
        user_key: auth[0],
        session_key: auth[1],
      };
    }
    return null;
  } catch (error) {
    console.error('Error during login');
    console.error(error);
    return null;
  }
}

/**
 * Sends an SMS message
 */

/**
 * Sends an SMS message to multiple recipients.
 * @param {Object} auth The auth object that contains the user_key and session_key.
 * @param {Array} recipients An array of strings or numbers containing the phone numbers of the recipients.
 * @param {String} message_text The text message to be sent (maximum length of 160 characters).
 * @param {String} sender The sender name showed on the recipient's phone.
 * @returns {Promise<Boolean>} The result of the sendSMS operation as a Boolean.
 */
async function _sendSMS(auth, recipients, message_text, sender) {
  try {
    const res = await axios.post(
      BASEURL + 'sms',
      {
        returnCredits: true,
        recipient: recipients,
        message: message_text,
        sender: sender,
        message_type: MESSAGE_HIGH_QUALITY,
      },
      {
        headers: { user_key: auth.user_key, Session_key: auth.session_key },
      }
    );

    if (!!res && res.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error sending sms');
    console.error(error);

    return false;
  }
}

/**
 * Sends an SMS message to multiple recipients using an Aruba account with user and password.
 * @param {String} username The Aruba account username.
 * @param {String} password The Aruba account password.
 * @param {Array} recipients An array of strings or numbers containing the phone numbers of the recipients.
 * @param {String} message_text The text message to be sent (maximum length of 160 characters).
 * @param {String} sender The sender name showed on the recipient's phone.
 * @returns {Promise<Boolean>} The result of the sendSMS operation as a Boolean.
 */
async function sendSMS(username, password, recipients, message_text, sender) {
  const auth = await _login(username, password);
  if (auth) {
    return await _sendSMS(auth, recipients, message_text, sender);
  } else {
    return false;
  }
}

exports.sendSMS = sendSMS;

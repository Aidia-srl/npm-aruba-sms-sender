var BASEURL = 'https://smspanel.aruba.it/API/v1.0/REST/';

var MESSAGE_HIGH_QUALITY = "N";

import { default as axios } from 'axios';

/**
 * Authenticates the user given it's username and password.  Callback
 * is called when completed. If error is false, then an authentication
 * object is passed to the callback as second parameter.
 */
async function _login(username, password) {
    try {
        const res = await axios.get(BASEURL + 'login?username=' + username + '&password=' + password);
        if (!!res && res.status == 200) {
            var auth = res.data.split(';');
            return{
                user_key : auth[0],
                session_key : auth[1]
            };
        }
        return null;
    } catch (error) {
        console.log('error during login')
        console.error(error)
        return null;
    }
}

/**
 * Sends an SMS message
 */
async function _sendSMS(auth, recipients, message_text) {
    try {
        
        const res = await axios.post(BASEURL + 'sms',{
            "returnCredits": true,
            "recipient": recipients,
            "message": message_text,
            "message_type": MESSAGE_HIGH_QUALITY
        }, {
            headers: { 'user_key' : auth.user_key, 'Session_key' : auth.session_key },
        });
        
        return res.status == 200
        
    } catch (error) {
        console.log('error sending sms')
        console.error(error)
        
        return false
    }
}

export async function sendSMS(user, password, recipients, message_text) {
    const auth = await _login(user, password);
    const success = await _sendSMS(auth, recipients, message_text);
    return {success}
}

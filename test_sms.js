const axios = require('axios');
const fast2smsAPIKey = 'uawK9vnLerTcRBYyQxV62GZhDU8AEm1kbWtIXsdH3fCjFqzJOpAZtVos4LuKD5gziYxTfaIPQ9X8hym2';

const trySendFast2SMS = async () => {
  try {
      const response = await axios.post(
        'https://www.fast2sms.com/bulkV2',
        {
          route: 'q',
          message: 'Test Message',
          numbers: '9999999999',
          flash: 0,
        },
        {
          headers: { authorization: fast2smsAPIKey, 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      console.log('Fast2SMS Result:', response.data);
  } catch(e) {
      console.error('Fast2SMS Error:', e.response ? e.response.data : e.message);
  }
};

trySendFast2SMS();

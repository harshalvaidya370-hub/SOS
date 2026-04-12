const axios = require('axios');

const trySendTextbelt = async (phoneNumbers, message) => {
  const phones = phoneNumbers.split(',');
  const results = [];
  for (const phone of phones) {
    const fullPhone = `+91${phone.trim()}`;
    try {
        const res = await axios.post(
          'https://textbelt.com/text',
          new URLSearchParams({ phone: fullPhone, message, key: 'textbelt' }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 10000 }
        );
        console.log(`[Textbelt] To ${fullPhone}:`, res.data);
    } catch(e) {
        console.error(e.message);
    }
  }
};

trySendTextbelt('9999999999', 'Test message');

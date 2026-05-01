const axios = require('axios');

const FIVESIM_API = 'https://5sim.net/v1';

async function get5SimNumber(country = 'usa', product = 'whatsapp') {
  const key = process.env.FIVESIM_API_KEY;
  if (!key) throw new Error('5SIM API key missing. Set FIVESIM_API_KEY in Render');
  
  try {
    const res = await axios.get(`${FIVESIM_API}/user/buy/activation/${country}/any/${product}`, {
      headers: { 
        'Authorization': `Bearer ${key}`, 
        'Accept': 'application/json' 
      },
      timeout: 15000
    });
    return res.data;
  } catch (err) {
    throw new Error(`5SIM Error: ${err.response?.data?.message || err.message}`);
  }
}

async function get5SimSms(id) {
  const key = process.env.FIVESIM_API_KEY;
  if (!key) throw new Error('5SIM API key missing');
  
  try {
    const res = await axios.get(`${FIVESIM_API}/user/check/${id}`, {
      headers: { 
        'Authorization': `Bearer ${key}`, 
        'Accept': 'application/json' 
      },
      timeout: 10000
    });
    return res.data;
  } catch (err) {
    throw new Error(`5SIM SMS Error: ${err.response?.data?.message || err.message}`);
  }
}

const axios = require('axios');

const SMM_API_URL = 'https://your-smm-panel.com/api/v2'; // Change this to your SMM panel URL
const SMM_API_KEY = process.env.SMM_KEY;

async function placeOrder(serviceId, link, quantity) {
  try {
    const res = await axios.post(SMM_API_URL, {
      key: SMM_API_KEY,
      action: 'add',
      service: serviceId,
      link: link,
      quantity: quantity
    });
    
    if (res.data.order) {
      return { ok: true, orderId: res.data.order, message: 'Order placed successfully' };
    }
    return { ok: false, error: res.data.error || 'Failed to place order' };
  } catch (err) {
    return { ok: false, error: err.message || 'SMM API error' };
  }
}

async function getOrderStatus(orderId) {
  try {
    const res = await axios.post(SMM_API_URL, {
      key: SMM_API_KEY,
      action: 'status',
      order: orderId
    });
    
    return { 
      ok: true, 
      status: res.data.status,
      remains: res.data.remains,
      startCount: res.data.start_count 
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Failed to get status' };
  }
}

async function getPanelBalance() {
  try {
    const res = await axios.post(SMM_API_URL, {
      key: SMM_API_KEY,
      action: 'balance'
    });
    
    return { ok: true, balance: res.data.balance, currency: res.data.currency };
  } catch (err) {
    return { ok: false, error: err.message || 'Failed to get balance' };
  }
}

async function listPanelServices() {
  try {
    const res = await axios.post(SMM_API_URL, {
      key: SMM_API_KEY,
      action: 'services'
    });
    
    return { ok: true, services: res.data };
  } catch (err) {
    return { ok: false, error: err.message || 'Failed to list services' };
  }
}

module.exports = {
  placeOrder,
  getOrderStatus,
  getPanelBalance,
  listPanelServices,
};

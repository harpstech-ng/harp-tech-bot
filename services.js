// ============================================================================
// SMM SERVICES - 50+ Social Media Boosts
// ============================================================================
const SMM_SERVICES = [
  // Instagram
  { code: 'IGF', name: 'Instagram Followers', platform: 'Instagram', pricePerK: 800, min: 100, max: 100000, panelId: 1 },
  { code: 'IGL', name: 'Instagram Likes', platform: 'Instagram', pricePerK: 150, min: 50, max: 50000, panelId: 2 },
  { code: 'IGV', name: 'Instagram Views', platform: 'Instagram', pricePerK: 50, min: 100, max: 1000000, panelId: 3 },
  { code: 'IGC', name: 'Instagram Comments', platform: 'Instagram', pricePerK: 500, min: 10, max: 5000, panelId: 4 },
  { code: 'IGR', name: 'Instagram Reel Views', platform: 'Instagram', pricePerK: 80, min: 100, max: 500000, panelId: 5 },
  
  // TikTok
  { code: 'TTF', name: 'TikTok Followers', platform: 'TikTok', pricePerK: 900, min: 100, max: 50000, panelId: 6 },
  { code: 'TTL', name: 'TikTok Likes', platform: 'TikTok', pricePerK: 120, min: 50, max: 100000, panelId: 7 },
  { code: 'TTV', name: 'TikTok Views', platform: 'TikTok', pricePerK: 40, min: 1000, max: 10000000, panelId: 8 },
  { code: 'TTS', name: 'TikTok Shares', platform: 'TikTok', pricePerK: 300, min: 50, max: 10000, panelId: 9 },
  
  // YouTube
  { code: 'YTV', name: 'YouTube Views', platform: 'YouTube', pricePerK: 1200, min: 1000, max: 1000000, panelId: 10 },
  { code: 'YTL', name: 'YouTube Likes', platform: 'YouTube', pricePerK: 800, min: 50, max: 10000, panelId: 11 },
  { code: 'YTS', name: 'YouTube Subscribers', platform: 'YouTube', pricePerK: 2500, min: 100, max: 50000, panelId: 12 },
  { code: 'YTC', name: 'YouTube Comments', platform: 'YouTube', pricePerK: 1500, min: 10, max: 1000, panelId: 13 },
  
  // Twitter/X
  { code: 'XTF', name: 'X Followers', platform: 'Twitter', pricePerK: 1000, min: 100, max: 50000, panelId: 14 },
  { code: 'XTL', name: 'X Likes', platform: 'Twitter', pricePerK: 200, min: 50, max: 10000, panelId: 15 },
  { code: 'XTR', name: 'X Retweets', platform: 'Twitter', pricePerK: 400, min: 50, max: 5000, panelId: 16 },
  
  // Facebook
  { code: 'FBF', name: 'Facebook Followers', platform: 'Facebook', pricePerK: 700, min: 100, max: 100000, panelId: 17 },
  { code: 'FBL', name: 'Facebook Likes', platform: 'Facebook', pricePerK: 150, min: 100, max: 50000, panelId: 18 },
  { code: 'FBP', name: 'Facebook Page Likes', platform: 'Facebook', pricePerK: 600, min: 100, max: 100000, panelId: 19 },
  
  // Telegram
  { code: 'TGM', name: 'Telegram Members', platform: 'Telegram', pricePerK: 500, min: 100, max: 100000, panelId: 20 },
  { code: 'TGV', name: 'Telegram Views', platform: 'Telegram', pricePerK: 100, min: 100, max: 1000000, panelId: 21 },
];

// ============================================================================
// AIRTIME & DATA
// ============================================================================
const AIRTIME_NETWORKS = ['MTN', 'Airtel', 'Glo', '9mobile'];

const DATA_PLANS = {
  'MTN-1GB': { network: 'MTN', name: '1GB - 30 Days', price: 350 },
  'MTN-2GB': { network: 'MTN', name: '2GB - 30 Days', price: 700 },
  'MTN-5GB': { network: 'MTN', name: '5GB - 30 Days', price: 1500 },
  'MTN-10GB': { network: 'MTN', name: '10GB - 30 Days', price: 2800 },
  'AIRTEL-1GB': { network: 'Airtel', name: '1GB - 30 Days', price: 350 },
  'AIRTEL-2GB': { network: 'Airtel', name: '2GB - 30 Days', price: 700 },
  'AIRTEL-5GB': { network: 'Airtel', name: '5GB - 30 Days', price: 1500 },
  'GLO-1GB': { network: 'Glo', name: '1GB - 30 Days', price: 300 },
  'GLO-2GB': { network: 'Glo', name: '2GB - 30 Days', price: 600 },
  'GLO-5GB': { network: 'Glo', name: '5GB - 30 Days', price: 1400 },
  '9MOBILE-1GB': { network: '9mobile', name: '1GB - 30 Days', price: 350 },
  '9MOBILE-2GB': { network: '9mobile', name: '2GB - 30 Days', price: 700 },
};

// ============================================================================
// BUSINESS SERVICES
// ============================================================================
const BIZ_SERVICES = {
  'LOGO': { name: 'Professional Logo Design', price: 5000, desc: 'Custom logo with 3 revisions' },
  'FLYER': { name: 'Business Flyer Design', price: 3000, desc: 'Social media flyer/poster' },
  'BUSINESS_CARD': { name: 'Business Card Design', price: 2000, desc: 'Front & back design' },
  'SOCIAL_MEDIA': { name: 'Social Media Management', price: 15000, desc: '30 days content + posting' },
  'BRAND_IDENTITY': { name: 'Full Brand Identity', price: 25000, desc: 'Logo + Colors + Fonts + Guide' },
  'WEBSITE_CONTENT': { name: 'Website Content Writing', price: 10000, desc: 'SEO optimized pages' },
  'VIDEO_AD': { name: 'Video Ad Creation', price: 12000, desc: '30-60sec promo video' },
  'JINGLE': { name: 'Business Jingle', price: 20000, desc: 'Custom audio jingle' },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function findSmmService(code) {
  return SMM_SERVICES.find(s => s.code.toLowerCase() === code.toLowerCase());
}

function calcSmmCost(service, quantity) {
  return Math.ceil((service.pricePerK / 1000) * quantity);
}

module.exports = {
  SMM_SERVICES,
  AIRTIME_NETWORKS,
  DATA_PLANS,
  BIZ_SERVICES,
  findSmmService,
  calcSmmCost,
};

const { GarminConnect } = require('garmin-connect');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tokens = JSON.parse(req.query.tokens || '{}');

    if (!tokens.oauth1 || !tokens.oauth2) {
      return res.status(401).json({ error: 'Tokens required' });
    }

    const garminClient = new GarminConnect();
    garminClient.loadToken(tokens.oauth1, tokens.oauth2);

    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;

    const activities = await garminClient.getActivities(start, limit);

    res.json({ success: true, activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};


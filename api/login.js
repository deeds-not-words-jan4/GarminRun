const { GarminConnect } = require('garmin-connect');

module.exports = async (req, res) => {
  // CORS headers for security
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const garminClient = new GarminConnect({
      username: email,
      password: password
    });

    await garminClient.login();

    // Export tokens to be sent to the client
    // The client will need to send this back with subsequent requests
    const tokens = garminClient.exportToken();
    res.json({ 
      success: true, 
      message: 'Successfully logged in to Garmin Connect',
      tokens: tokens
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Login failed. Please check your credentials.' });
  }
};


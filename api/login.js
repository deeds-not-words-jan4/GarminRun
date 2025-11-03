const { GarminConnect } = require('garmin-connect');

module.exports = async (req, res) => {
  console.log('=== Login API called ===');
  console.log('Method:', req.method);
  console.log('Has body:', !!req.body);
  
  // CORS headers for security
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request, returning 200');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Invalid method, returning 405');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting login process...');
    const { email, password } = req.body;
    console.log('Email received:', !!email);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Creating GarminConnect client...');
    const garminClient = new GarminConnect({
      username: email,
      password: password
    });

    console.log('Attempting login...');
    await garminClient.login();
    console.log('Login successful!');

    // Export tokens to be sent to the client
    // The client will need to send this back with subsequent requests
    console.log('Exporting tokens...');
    const tokens = garminClient.exportToken();
    console.log('Tokens exported, sending response');
    res.json({ 
      success: true, 
      message: 'Successfully logged in to Garmin Connect',
      tokens: tokens
    });
  } catch (error) {
    console.error('=== Login error ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    res.status(401).json({ error: 'Login failed. Please check your credentials.', details: error.message });
  }
};


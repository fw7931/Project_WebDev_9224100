const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_KEY = '7039be6a125559076cb783a500a2e710';

app.use(express.static('public'));
app.use(express.json());

// Route for fetching current weather
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching forecast data:', error.response?.data || error.message);
    res.status(500).send('Error fetching weather data');
  }
});

// Route for fetching weather forecast
app.get('/forecast/:city', async (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=3&appid=${API_KEY}`;

  console.log(`Fetching forecast for: ${city}, URL: ${url}`);
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching forecast data:', error.response?.data || error.message);
    res.status(500).send('Error fetching forecast data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

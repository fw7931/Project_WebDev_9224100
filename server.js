const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_KEY = '7039be6a125559076cb783a500a2e710';

app.use(express.static('public'));
app.use(express.json());

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

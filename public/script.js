document.getElementById('submitCity').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;

  try {
    const response = await fetch(`/weather/${city}`);

    if (!response.ok) {
      console.error('Error fetching weather data');
      document.getElementById('weatherInfo').innerText = 'Unable to fetch weather data. Please try again.';
      return;
    }

    const weatherData = await response.json();

    const temperature = weatherData.main.temp;
    const condition = weatherData.weather[0].main;

    // Display the weather data
    document.getElementById('weatherInfo').innerText = `Temperature: ${temperature}°C, Condition: ${condition}`;

    // Call function to recommend clothes and activities based on the weather
    recommendClothesAndActivities(temperature, condition);

    // Fetch and display the weather forecast
    await fetchForecast(city);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('weatherInfo').innerText = 'An error occurred. Please try again later.';
  }
});

async function fetchForecast(city) {
  try {
    const response = await fetch(`/forecast/${city}`);

    if (!response.ok) {
      document.getElementById('forecastInfo').innerText = 'Unable to fetch forecast data. Please try again.';
      return;
    }

    const forecastData = await response.json();
    const forecastList = forecastData.list.map(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      return `${date}: ${forecast.main.temp}°C, ${forecast.weather[0].main}`;
    });

    document.getElementById('forecastInfo').innerHTML = `<h3>3-Day Forecast</h3><ul>${forecastList.map(item => `<li>${item}</li>`).join('')}</ul>`;
  } catch (error) {
    console.error('Error:', error);
  }
}

function recommendClothesAndActivities(temperature, condition) {
  let recommendation = '';
  let activitySuggestion = '';
  let imageSrc = '';
  let imageSrc2 = '';

  if (temperature > 25) {
    recommendation = 'Wear light clothing, like shorts and a t-shirt.';
    activitySuggestion = 'Recommended: Go for a swim or a picnic!';
    imageSrc = 'images/temp_25.jpg';
  } else if (temperature > 15) {
    recommendation = 'Wear a light jacket or sweater.';
    activitySuggestion = 'Recommended: A walk in the park or outdoor sports.';
    imageSrc = 'images/temp_15.jpg';
  } else if (temperature > 5) {
    recommendation = "It's getting cold. Wear a warm coat, scarf, and gloves.";
    activitySuggestion = 'Recommended: Visit a cozy cafe or museum.';
    imageSrc = 'images/temp_5.jpg';
  } else {
    recommendation = "Wear heavy winter clothing. Don't forget your hat and gloves!";
    activitySuggestion = 'Recommended: Stay indoors and enjoy a hot drink!';
    imageSrc = 'images/temp_0.jpg';
  }

  if (condition === 'Rain') {
    recommendation += ' Also, carry an umbrella or wear a waterproof jacket.';
    activitySuggestion = 'Recommended: Indoor activities like reading or gaming.';
    imageSrc2 = 'images/rain.jpg';
  } else if (condition === 'Snow') {
    recommendation += ' Wear snow boots and a thick coat.';
    activitySuggestion = 'Recommended: Build a snowman or go skiing!';
    imageSrc2 = 'images/snow.jpg';
  }

  document.getElementById('clothingAdvice').innerText = recommendation;
  document.getElementById('activitySuggestion').innerText = activitySuggestion;

  const weatherImage = document.getElementById('weatherImage');
  const weatherImage2 = document.getElementById('weatherImage2');
  weatherImage.src = imageSrc;
  if (imageSrc2) {
    weatherImage2.src = imageSrc2;
    weatherImage2.style.display = 'block';
  }
  weatherImage.style.display = 'block';
}

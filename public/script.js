document.getElementById('submitCity').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const response = await fetch(`/weather/${city}`);
    const weatherData = await response.json();
    
    const temperature = weatherData.main.temp;
    const condition = weatherData.weather[0].main;
  
    // Display the weather data
    document.getElementById('weatherInfo').innerText = `Temperature: ${temperature}°C, Condition: ${condition}`;
  
    // Call function to recommend clothes based on the weather
    recommendClothes(temperature, condition);
  });
  
  function recommendClothes(temperature, condition) {
    let recommendation = '';
    
    if (temperature > 25) {
      recommendation = 'Wear light clothing, like shorts and a t-shirt.';
    } else if (temperature > 15) {
      recommendation = 'Wear a light jacket or sweater.';
    } else if (temperature > 5) {
      recommendation = 'It\'s getting cold. Wear a warm coat, scarf, and gloves.';
    } else {
      recommendation = 'Wear heavy winter clothing. Don\'t forget your hat and gloves!';
    }
  
    if (condition === 'Rain') {
      recommendation += ' Also, carry an umbrella or wear a waterproof jacket.';
    } else if (condition === 'Snow') {
      recommendation += ' Wear snow boots and a thick coat.';
    }
  
    document.getElementById('clothingAdvice').innerText = recommendation;
  }
  
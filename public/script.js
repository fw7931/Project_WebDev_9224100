document.getElementById('submitCity').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  const response = await fetch(`/weather/${city}`);
  
  if (!response.ok) {
      console.error('Error fetching weather data');
      return;
  }

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
  let imageSrc = ''; // Declare the imageSrc variable

  if (temperature > 25) {
      recommendation = 'Wear light clothing, like shorts and a t-shirt....';
      imageSrc = 'images/summer.jpg';
  } else if (temperature > 15) {
      recommendation = 'Wear a light jacket or sweater.';
      imageSrc = 'images/summer.jpg';
  } else if (temperature > 5) {
      recommendation = 'It\'s getting cold. Wear a warm coat, scarf, and gloves.';
      imageSrc = 'images/summer.jpg';
  } else {
      recommendation = 'Wear heavy winter clothing. Don\'t forget your hat and gloves!';
      imageSrc = 'images/summer.jpg';
  }

  if (condition === 'Rain') {
      recommendation += ' Also, carry an umbrella or wear a waterproof jacket.';
      imageSrc = 'images/summer.jpg';
  } else if (condition === 'Snow') {
      recommendation += ' Wear snow boots and a thick coat.';
      imageSrc = 'images/summer.jpg';
  }

  // Display the clothing recommendation
  document.getElementById('clothingAdvice').innerText = recommendation;

  // Update the image source and make it visible
  const weatherImage = document.getElementById('weatherImage');
  weatherImage.src = imageSrc;
  weatherImage.alt = condition;
  weatherImage.style.display = 'block'; // Show the image

  // Log the imageSrc to help with debugging
  console.log(`Image Source: ${imageSrc}`);
}

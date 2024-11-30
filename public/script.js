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

    // Call function to recommend clothes based on the weather
    recommendClothes(temperature, condition);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('weatherInfo').innerText = 'An error occurred. Please try again later.';
  }
});

function recommendClothes(temperature, condition) {
  let recommendation = '';
  let imageSrc = ''; // Declare the imageSrc variable
  let imageSrc2 = '';

  if (temperature > 25) {
    recommendation = 'Wear light clothing, like shorts and a t-shirt.';
    imageSrc = 'images/temp_25.jpg';
  } else if (temperature > 15) {
    recommendation = 'Wear a light jacket or sweater.';
    imageSrc = 'images/temp_15.jpg';
  } else if (temperature > 5) {
    recommendation = "It's getting cold. Wear a warm coat, scarf, and gloves.";
    imageSrc = 'images/temp_5.jpg';
  } else {
    recommendation = "Wear heavy winter clothing. Don't forget your hat and gloves!";
    imageSrc = 'images/temp_0.jpg';
  }

  if (condition === 'Rain') {
    recommendation += ' Also, carry an umbrella or wear a waterproof jacket.';
    imageSrc2 = 'images/rain.jpg';
  } else   {
    recommendation += ' Wear snow boots and a thick coat.';
    imageSrc2 = 'images/snow.jpg';
  }

  // Display the clothing recommendation
  document.getElementById('clothingAdvice').innerText = recommendation;

  // Update the image source and make it visible
  const weatherImage = document.getElementById('weatherImage');
  // Set a second image source
  const weatherImage2 = document.getElementById('weatherImage2');
  weatherImage.src = imageSrc;
  if (imageSrc2) {
    weatherImage2.src = imageSrc2;
    weatherImage2.alt = condition;
    weatherImage2.style.display = 'block'; // Show the second image
  }
  weatherImage.alt = condition;
  weatherImage.style.display = 'block'; // Show the image

  // Log the imageSrc to help with debugging
  console.log(`Image Source: ${imageSrc}, Image Source 2: ${imageSrc2}`);
}

    

import axios from 'axios';
import type { AxiosResponse } from 'axios';
const cache = new Map<string, any>();

export const handler = async (event: { city: string }) => {
  const { city } = event;

  if (!city) {
    return {
      error: 'VALIDATION_ERROR',
      message: 'City is required'
    };
  }

  if (cache.has(city)) {
    return cache.get(city);
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=mock_key`;

    //const response = await axios.get(url);


    const response = await fetchWithRetry(url);

    const data = response.data;

    const result = {
      city: data.name,
      temp: Math.round(data.main.temp - 273.15),
      conditions: data.weather[0].main
    };

    cache.set(city, result);
    setTimeout(() => cache.delete(city), 60000);

    return result;

  } catch (error) {
    console.error(error);

    return {
      error: 'API_ERROR',
      message: 'Failed to fetch weather'
    };
  }
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function fetchWithRetry(
  url: string,
  retries = 2
): Promise<AxiosResponse> {
  let wait = 1000;

  for (let i = 0; i <= retries; i++) {
    try {
      return await axios.get(url);
    } catch (err) {
      console.error('Retry attempt:', i);

      if (i === retries) throw err;

      await delay(wait);
      wait *= 2; // exponential
    }
  }

  throw new Error("Unexpected Error")
}

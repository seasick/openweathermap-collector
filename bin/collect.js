#!/usr/bin/env node
// This script gets forecast data from openweathermap
const {appendFile, writeFile, stat, mkdir} = require('fs/promises');
const {dirname} = require('path');
const path = require('path');
const openweathermap = require('../lib/openweathermap');


(async () => {
  const openweatherApiKey = process.argv[2];
  const lat = process.argv[3];
  const lon = process.argv[4];
  const stationId = process.argv[5];

  // Get weather
  const zeroPad = (num, places = 2) => String(num).padStart(places, '0');
  const weather = await openweathermap(openweatherApiKey, lat, lon);

  const date = new Date(weather.dt * 1000);
  const year = date.getFullYear();
  const month = zeroPad((date.getMonth() + 1));
  const day = zeroPad(date.getDate());
  const hours = zeroPad(date.getHours());
  const minutes = zeroPad(date.getMinutes());

  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes}`;
  const fileName = `${dateString}.jsonl`;

  const filePath = path.resolve(__dirname, `../data/${stationId}/${fileName}`);
  const fileContent = JSON.stringify(weather) + '\n';

  await mkdir(dirname(filePath), {recursive: true});

  try {
    await stat(filePath);

    console.log(`Append ${filePath}`);
    await appendFile(filePath, fileContent);
  } catch (err) {
    // if not existing, create new file
    if (err.code === 'ENOENT') {
      console.log(`Create ${filePath}`);
      await writeFile(filePath, fileContent);
    } else {
      throw err;
    }
  }

  console.log(`Write data for ${dateString} ${timeString}`);
})();

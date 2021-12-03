const request = require("request");
const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8ee80c234da40babd574f2a0f82594cf&query=${lat},${lng}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("unable to find location!", undefined);
    } else {
      const desc = response.body.current.weather_descriptions[0];
      const temperature = response.body.current.temperature;
      const feelslike = response.body.current.feelslike;
      const humidity = response.body.current.humidity;
      const uv_index = response.body.current.uv_index;
      callback(undefined, {
        desc,
        temperature,
        feelslike,
        humidity,
        uv_index
      });
    }
  });
};
module.exports = forecast;

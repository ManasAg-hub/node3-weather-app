const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static dir to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Manas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "Manas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "how can i help you",
    title: "Help",
    name: "manas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address provided!",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, { desc, temperature, feelslike }) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: `${desc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degree.`,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "help article not found.",
    title: "manas",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found.",
    title: "manas",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

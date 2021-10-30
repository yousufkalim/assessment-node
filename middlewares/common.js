const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//exporting common middlewares
module.exports = (app) => {
  app.use(cors({ origin: true })); // CORS (Cross Origin Policy) to restrict unknown requests
  app.use(morgan("dev")); //to log requests
  app.use(express.json()); //to send json data in response
  app.use(express.urlencoded({ extended: true })); //to  get encoded url data from request
  app.use("./uploads", express.static("uploads", { maxAge: "31536000" })); //static path for storing pictures uploaded by user in cache
};

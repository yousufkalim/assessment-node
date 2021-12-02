// Init
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URI;

mongoose.set("debug", true);

// DB connection
mongoose
  .connect(mongoURL, {
    // Some common settings (You don't need to understand these)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, //connecting out as its throwing error of not supported
    useFindAndModify: false, //connecting out as its throwing error of not supported
    ignoreUndefined: true,
  })
  .then(() => {
    console.log("COnnection established yayyyyyy"); //success
  })
  .catch((err) => {
    console.log("Connection cant be established------>", err); //if connection cant be established, throw error
  });

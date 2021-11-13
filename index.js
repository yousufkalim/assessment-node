// init
require("dotenv").config();
const app = require("express")();
const port = process.env.PORT || 5000;

require("./database"); //connecting with db through this file

//middleware
require("./middleware/common.js")(app);

//api routes
app.use("/api", require("./routes"));

//Server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

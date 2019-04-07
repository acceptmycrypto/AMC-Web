const app = require("./app");

//Heroku tells us which port our app to use. For production, we use Heroku port. For development, we use 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("Backend server is listening on 3001");
});

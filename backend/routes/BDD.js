var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};
mongoose.connect(
  "mongodb+srv://hortense_gueneau:q5CAsYqys760amwC@cluster0-iminb.mongodb.net/morningNews",
  options,
  function(err) {
    console.log(err);
  }
);

const mongoose = require("mongoose");

const MongoDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Error: ", error));
};

module.exports = MongoDB;

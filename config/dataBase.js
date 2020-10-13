const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

console.log("Conectando DB");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log("Hubo un error");
    console.log("Error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;

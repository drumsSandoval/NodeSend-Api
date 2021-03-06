const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dataBase");
const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));
app.listen(port, "0.0.0", () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});

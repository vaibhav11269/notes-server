const express = require("express");
require("dotenv").config();
require("./models");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Server is working</h1>");
})

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server listening on Port:", PORT);
})
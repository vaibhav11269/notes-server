const express = require("express");
require("dotenv").config();
require("./models");
const cors = require("cors");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
const limiter = require("./middlewares/rateLimiter")

const app = express();

app.use(express.json());
app.use(cors());
app.use(limiter);

app.get("/", (req, res) => {
    res.send("<h1>Server is working</h1>");
})

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server listening on Port:", PORT);
})
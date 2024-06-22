const express = require("express");

const {
  generateMeta,
  generateImage,
} = require("./controllers/openaiController");

const app = express();

app.listen(4000, () => console.log("Listening to port 4000...."));

// middleware
app.use(express.json());
app.use(express.static("public"));

// routes
app.post("/openai/meta", generateMeta);
app.post("/openai/image", generateImage);

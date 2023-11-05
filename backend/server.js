import { createRequire } from "module";

import * as deepl from "deepl-node";
const require = createRequire(import.meta.url);

const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.listen(PORT, () => console.log("Server running on PORT " + PORT));

app.get("/", (req, res) => {
  res.status(200).json({
      message: "Testing whether the API works"
  });
});

app.get("/languages", async(req, res) => {
  const authKey = process.env.DEEPL_API_KEY; // Replace with your key
  const translator = new deepl.Translator(authKey);
  const sourceLanguages = await translator.getSourceLanguages();

  try {
    res.status(200).json(sourceLanguages.map(lang => `${lang.name} (${lang.code})`));
  } catch(err) {
    console.log(err);
    res.status(500).json({message: err});
  }
});

app.get("/translation", async(req, res) => {
  const {textToTranslate, outputLanguage, inputLanguage } = req.query;
  const authKey = process.env.DEEPL_API_KEY; // Replace with your key
  const translator = new deepl.Translator(authKey);

  try {
    const result = await translator.translateText(textToTranslate, inputLanguage, outputLanguage);
    res.status(200).json(result);
  } catch(err) {
    console.log(err);
    res.status(500).json({message: err});
  }
});


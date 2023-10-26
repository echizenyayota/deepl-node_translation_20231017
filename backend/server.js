import { createRequire } from "module";
const require = createRequire(import.meta.url);

import * as deepl from "deepl-node";

const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.listen(PORT, () => console.log("Server running on PORT " + PORT));

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
  const authKey = process.env.DEEPL_API_KEY; // Replace with your key
  const translator = new deepl.Translator(authKey);

  try {
    (async () => {
      const result = await translator.translateText('good evening', null, "ja");
      console.log(result.text);
      res.status(200).json(result.text);
    })();
  } catch(err) {
    console.log(err);
    res.status(500).json({message: err});
  }
});
const express = require('express')
const app = express();
const dotenv =require("dotenv");
dotenv.config({path: './config.env'});
require('./db/connect');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
      res.send(' Ramuduu')
      })

app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      }
)
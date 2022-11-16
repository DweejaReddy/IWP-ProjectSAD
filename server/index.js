const express = require('express')

const dotenv =require("dotenv");
const app = express();
dotenv.config({path: './config.env'});

const PORT = process.env.PORT || 8000;
require("./schema/userschema");
require('./db/connect');

app.use(express.json());
app.use(require("./router/auth"));
app.get('/', (req, res) => {
      res.send(' Ramuduu')
 })


app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      }
);
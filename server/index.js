require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 7000;

const app = express();

app.listen(PORT, console.log(`Server start on port: ${PORT}`));
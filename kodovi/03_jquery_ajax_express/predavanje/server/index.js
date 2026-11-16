/*
const solve = require("./quadratic.js");

console.log(solve(1, 2, 0.2));
*/

// import express from 'express'
const express = require("express");

const app = express()

/*
app.get('/', (req, res) => {
  res.send('Hello World')
});
*/
app.use(express.static("../client"));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});
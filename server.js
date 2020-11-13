// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log(`Lab 5 for ${process.env.NAME}`);
    res.send(`Lab 5 for ${process.env.NAME}`);

  })
  .post(async(req, res) => {

    console.log('POST request detected');
    
    // Make a fetch request to the price geroge county api 
    // grab the json data 
    const data = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json");
    const json = await data.json();

    // Submit the data to console log to review 
    console.log('Form data in res.body', json);


    // send back the data in a json instead of res.send which is only returning a string 
    res.json(json)



  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

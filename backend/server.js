const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const path = require('path');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
    'mongodb+srv://crysta:3.14159265e@crysta-database.qrvsc.mongodb.net/crysta?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

// let db = mongoose.connection //db.collection("task-switches");

let db = mongoose.connection; 

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

var username = '';

app.post('/send-user', (req, res) => {
  username = req.body.username;
  console.log('Username:', username);
  res.sendStatus(200);
});

// this is our get method
// this method fetches all available data in our database

app.get('/*', (req, res) => {
  // let url = path.join('/public/', 'index.html');
  // if (!url.startsWith('/src/')) // we're on local windows
  //   url = url.substring(1);
  res.sendFile('/build/index.html', { root: "../frontend" });

});

console.log("app/frontend") 

router.get('/getData', (req, res) => {
  let today = new Date();
  var query_date = today.toISOString().slice(0,10);
  var query = {username: username, date: query_date};
  Data.find(query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(process.env.PORT || API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
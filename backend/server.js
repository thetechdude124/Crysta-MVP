const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const {EnergyData} = require('./data')
const {PomodoroData} = require('./data')
const {TaskData} = require('./data')
const path = require('path');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
    'YOUR_MONGO_URL_HERE';

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

// this is our get method
// this method fetches all available data in our database

console.log("app/frontend") 

router.get('/getData', (req, res) => {

  //Get username value
  let username = String(req.query.username);
  let data_source = String(req.query.source);

  //Find and process date
  var timezone = (new Date()).getTimezoneOffset() * 60000;
  var localtime = (new Date(Date.now() - timezone)).toISOString().slice(0, -1);
  var query_date = localtime.slice(0,10);
  
  //Check to see if this request is being made to display energy scores or maintain pomodoro/tasks elements
  if (data_source === 'energy-tracker') {

    //Define query
    var query = {username: username, date: query_date, source: data_source};

    //Regular query - fetch energy data
    EnergyData.find(query, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });

  } else if (data_source === 'pomodoro') {

    //Use pomodoro source for the query and log both
    var query = {username: username, date: query_date, source: data_source};
    console.log(query);
    console.log(data_source);

    //Query
    PomodoroData.find(query, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });

  } else if (data_source === 'tasks') {

    //Define query
    var query = {username: username, date: query_date, source: data_source};

    //Regular query - fetch energy data
    TaskData.find(query, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {

  const { update_data } = req.body;
  const source = update_data.source;
  console.log(source);
  console.log(update_data);

  if (source === 'energy-tracker') {

    //Energy tracker frontend is not updating data as of v.0.2
    //Kept here for potential future purposes

  } else if (source === 'pomodoro') {

    const { DocumentID, update_data } = req.body;

    PomodoroData.findByIdAndUpdate(DocumentID, update_data, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });

  } else if (source === 'tasks') {

    const { DocumentID, update_data } = req.body;
    console.log(DocumentID);
    console.log(update_data);

    TaskData.findByIdAndUpdate(DocumentID, update_data, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });

  }
  

});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  console.log(id);
  TaskData.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {

  const { source } = req.body;
  console.log(source);

  //Display req.body
  console.log('Req Body:');
  console.log(req.body);

  if (source === 'energy-tracker') {

    //Energy tracker frontend is not posting data as of v.0.2
    //Kept here for potential future purposes

  } else if (source === 'pomodoro') {

    //Get remaining variables from body
    const { _id, username, date, sessions_completed } = req.body;

    //Create an object out of the schema module -> basically making a brand new document filled with user data
    //Required for posts but not for get, as the schema simply finds entries that correspond to itself
    let data = new PomodoroData();

    if ((!_id && _id !== 0) || !username || !date || !sessions_completed || !source) {
      return res.json({
        success: false,
        error: 'INVALID POMODORO INPUTS',
      });
    }

    data._id = _id;
    data.username = username;
    data.date = date;
    data.sessions_completed = sessions_completed;
    data.source = source;

    //Save new object into database
    data.save((err) => {
      if (err) return res.json({ success: false, error: err });
      console.log(err)
      return res.json({ success: true });
    });

  } else if (source === 'tasks') {

    //Get remaining variables from body
    const { _id, username, desc, due_date, complete, source } = req.body;
    
    //Create an object out of the schema module -> basically making a brand new document filled with user data
    //Required for posts but not for get, as the schema simply finds entries that correspond to itself
    let data = new TaskData();

    if ((!_id && _id !== 0) || !username || !desc || !due_date || !source) {
      return res.json({
        success: false,
        error: 'INVALID TASK INPUTS',
      });
    }

    data._id = _id;
    data.username = username;
    data.desc = desc;
    data.due_date = due_date;
    data.complete = complete;
    data.source = source;

    //Save new object into database
    data.save((err) => {
      if (err) return res.json({ success: false, error: err });
      console.log(err)
      return res.json({ success: true });
    });
  }

});

// append /api for our http requests
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../frontend', '/build')));

app.get('*', (req, res) =>
  res.sendFile(
    path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
  )
);

// launch our backend into a port
app.listen(process.env.PORT || API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

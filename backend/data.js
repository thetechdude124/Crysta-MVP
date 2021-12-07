const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
//Update this!
const EnergySchema = new Schema(
  {
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "_id"},
    username: {type: mongoose.Schema.Types.String, ref: "username"},
    date: {type: mongoose.Schema.Types.String, ref: "date"},
    hour: {type: mongoose.Schema.Types.String, ref: "hour"},
    task_switches: {type: mongoose.Schema.Types.Number, ref: "task_switches"}
  },
  {collection : 'task-switches'},
  { timestamps: true }
);

const PomodoroSchema = new Schema(
  {
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "_id"},
    username: {type: mongoose.Schema.Types.String, ref: "username"},
    date: {type: mongoose.Schema.Types.String, ref: "date"},
    sessions_completed : {type: mongoose.Schema.Types.Number, ref: "sessions_completed"},
    source: {type: mongoose.Schema.Types.String, ref: "pomodoro"},
  },
  {collection : 'task-switches'},
  { timestamps: true}
)

// export the new Schema so we could modify it using Node.js
module.exports = {EnergySchema: mongoose.model("EnergyData", EnergySchema), PomodoroSchema: mongoose.model("PomodoroData", PomodoroSchema)}
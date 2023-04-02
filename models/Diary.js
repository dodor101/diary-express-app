const mongoose = require("mongoose");
const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type:  Date,
    required: true,
  },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;

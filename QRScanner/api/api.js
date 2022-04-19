const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://epsilon:epsilon@cluster0.t883m.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const Device = require('./models/device');

const app = express();

const bodyParser = require('body-parser');
const { $where } = require('./models/device');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5000;

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return err
      ? res.send(err)
      : res.send(devices);
  });
});

// app.post('/api/devices', (req, res) => {
//   const { Content, _Date } = req.body;
//   const newDevice = new Device({
//     Content, _Date
//   });
//   newDevice.save(err => {
//     return err
//       ? res.send(err)
//       : res.send("Sucessful");
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://epsilon:epsilon@cluster0.t883m.mongodb.net/NexFit",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const express = require("express");
const User = require("./models/user");
const sport = require("./models/sport");

const app = express();

const bodyParser = require("body-parser");
const user = require("./models/user");
const { json } = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const port = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
 * @api {get} /api/users AllUsers: An array of all Users and their details
 * @apiGroup User
 * @apiSuccessExample {json} Success-Response:
 *  [
 *    {
 *      "activityLog": [],
 *      "_id": "6243e6367a5eb8e7462fe4ef",
 *      "name": "example",
 *      "email": "example@mail.com",
 *      "password": "not@password",
 *      "activityLog": [],
 *      "__v": 0
 *    },
 *    {
 *      "_id": "624c43db93ff875a1ec033fd",
 *      "name": "nexfit",
 *      "email": "nexfit@mail.com",
 *      "password": "supersecretpassword",
 *      "activityLog": [],
 *      "__v": 0
 *    }
 *  ]
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "User does not exist"
 *  }
 */
app.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    return err ? res.send(err) : res.send(users);
  });
});

/**
 * @api {post} /api/users ADDUsers: Add the entered user and details
 * @apiGroup User
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "successfully created account for " + name( entered username )
 *  }
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "Could not add user and data"
 *  }
 */
app.post("/api/users", (req, res) => {
  const { name, email, password, activityLog } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    activityLog,
  });
  newUser.save((err) => {
    return err
      ? res.send(err)
      : res.send("successfully created account for " + name);
  });
});

/**
 * @api {get} /api/sport AllSport: An array of all Sport and their number of players currently playing
 * @apiGroup Sport
 * @apiSuccessExample {json} Success-Response:
 *  [
 *    {
 *      "_id": "624bcc084879dae4722817bd",
 *      "name": "basketball",
 *      "number": 2
 *    },
 *    {
 *      "_id": "624bcdae4879dae4722817bf",
 *      "name": "football",
 *      "number": 6
 *    },
 *    {
 *      "_id": "624bcdb34879dae4722817c0",
 *      "name": "lawntennis",
 *      "number": 1
 *    }
 *  ]
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "Sports does not exist"
 *  }
 */
app.get("/api/sport", (req, res) => {
  sport.find({}, (err, sport) => {
    return err ? res.send(err) : res.send(sport);
  });
});

/**
 * @api {post} /api/sport UpdateSport: update the number of players in the specified sport
 * @apiGroup Sport
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "successfully updated capacity for " + current( selected sport )
 *  }
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "Could not update sport capacity"
 *  }
 */
app.post("/api/sport", (req, res) => {
  const { current, change } = req.body;
  sport.updateOne({ name: current }, { $inc: { number: change } }, (err) => {
    return err
      ? res.send(err)
      : res.send("successfully updated capacity for " + current);
  });
});

/**
 * @api {get} /api/log UserActivity: An array of all Users and their details
 * @apiGroup Activity Log
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      "_id": "6243d7fa0cb4885d452c7d74",
 *      "name": "TheChosenOne",
 *      "email": "chosen@one.com",
 *      "password": "FitnessLover123",
 *      "activityLog": [
 *          {
 *              "sport": "basketball",
 *              "time": "00hr 30min 06sec"
 *          },
 *          {
 *              "sport": "lawntennis",
 *              "time": "00hr 40min 12sec"
 *          },
 *          {
 *              "sport": "football",
 *              "time": "01hr 05min 10sec"
 *          }
 *      ],
 *      "__v": 3
 *    }
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "User does not exist"
 *  }
 */
app.get("/api/log", (req, res) => {
  User.find({}, (err, user) => {
    return err ? res.send(err) : res.send(user);
  });
});

/**
 * @api {post} /api/log ADDActivity: Add sport with time played to the user data
 * @apiGroup Activity Log
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "successfully added Activity Log"
 *  }
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "Could not add user and data"
 *  }
 */
app.post("/api/log", (req, res) => {
  const { email, sport, time } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    }

    const { activityLog } = user;

    activityLog.push({ sport, time });
    user.activityLog = activityLog;

    user.save((err) => {
      return err ? res.send(err) : res.send("successfully added Activity Log");
    });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

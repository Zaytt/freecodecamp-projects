const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const request = require('request');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//RETURNS A USER OBJ
exports.getUser = async function(req, res, next){
  let userId = req.params.userId;
  if(userId.length === 0 || userId === null || userId === undefined){
    res.send({'error': 'Username not specified'});
    return;
  }
  
  User.findById(userId,  await function (err, user){
    if(err) next(err);
    
    if(user === null){
      res.send({error: 'user not found'});
    } else {
      res.send(user);
    }
    
  });
  
}

// CREATES A USER IN THE DB
exports.createUser = async function (req, res, next) {
  let username = req.body.username;
  
  if(username.length === 0){
    res.send({'error': 'Username not specified'});
    return;
  } else if(username.length > 30){
    res.send({'error': 'Exceeded username max character limit'});
    return;
  }
  if(await findUser(username)){
    res.send({'error': 'user already exists'});
    return;
  }
  let user = new User({
    username: username
  });
  
  user.save(function(err) {
    if(err){
      return next(err);
    }
    res.send({username: user.username, _id: user._id});
  });
}

// SENDS AN ARRAY OF ALL THE USERS
exports.getAllUsers = (req, res, next) => {
  User.find({},'username _id', function(err, users){
    if(err) return next(err);
    res.send(users);
  })
}

//Removes a user from the DB
exports.deleteUser = function(req, res, next){
  User.remove({ username: req.body.username}, function(err){
    if(err) return next(err);
    res.send('User '+ req.body.username + ' deleted');
  })
}


async function findUser(username){
  let user = await User.findOne({username: username});
  if (user) { // already exists, so return info
    return user;
  } else {
    return false;
  }
}

// ADDS AN EXERCISE FOR THE GIVEN USER
exports.addExercise = async (req, res, next)=>{
  let id = req.body.userId;
  let desc = req.body.description;
  let duration = req.body.duration;
  let date;

  //Make a request to find the user for the given ID
  request('https://zaytt-exercise-tracker-api.glitch.me/api/exercise/user/'+id, { json: true }, await function(err, response, body){
    if (err) { return console.log(err); }
  
    //If the user is not found, stop
    if(body.error){
      res.send({'error': 'user not found'});
      return;
    }
    
    let user = {username: body.username, _id: body._id};
    
    if (req.body.date === undefined) {
      date = new Date();
    } else {
      date = new Date(req.body.date);
    }

    let exercise = new Exercise({
      userId : id,
      description : desc,
      duration : duration,
      date : date
    });

    
    exercise.save((err)=>{
      if(err) return next(err);

      let resObj = {
        _id: user._id,
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date
      }
      
      res.send(resObj);
    });
  });  
}


// RETURNS THE USER OBJ ALONG WITH AN ARRAY OF EXERCISES DONE BY THE USER
exports.getUserLog = async function(req, res, next){
  let id = req.query.userId;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;

  if(id === undefined){
    return res.send({error: "missing user id"});
  }
  //Make a request to find the user for the given ID
  request('https://zaytt-exercise-tracker-api.glitch.me/api/exercise/user/'+id, { json: true }, await function(err, response, body){
    if (err) { return console.log(err); }
  
    //If the user is not found, stop
    if(body.error){
      res.send({'error': 'user not found'});
      return;
    }
    
    let user = {username: body.username, _id: body._id};
    
    let queryOptions = {userId: user._id};
    let dateFilter = {};
    
    
    //Checks and validates the 'from' parameter
    if(from != undefined ) {
      let fromDate = new Date(req.query.from);
      if(isValidDate(fromDate)){
        let fromFilter = {$gte: fromDate};
        Object.assign(dateFilter, fromFilter);
      }
    }
    
    //Checks and validates the 'to' parameter
    if(to != undefined){
      let toDate = new Date(req.query.to);  
      if(isValidDate(toDate)){
        let toFilter = {$lte: toDate};
        Object.assign(dateFilter, toFilter);
      }
    }
    
    //If either 'from' or 'to' are defined, use them as filters
    if(Object.keys(dateFilter).length > 0 && dateFilter.constructor === Object)
      Object.assign(queryOptions, {date: dateFilter});
    
    
    let query = Exercise.find(queryOptions);
    
    //Set the limit on the results
    if(limit != undefined && !isNaN(limit))
      query.limit(parseInt(limit))
      
    
    query.exec((err, exerciseArray)=> {
      if(err) return console.log(err);
      // user object with added array log and count (total exercise count)
      let resObj = {
        user_id: user._id,
        username: user.username,
        exercise_count : exerciseArray.length,
        exercise_log : exerciseArray
      }
      
      res.send(resObj);
    });
    
    
  });
  
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res)=> {
  let dateString = req.params.date_string;
  let date;
  
  //Date is not specified
  if(dateString === undefined){
    date = new Date();
    res.send({'unix':date.getTime(), 'utc': date.toUTCString()});
  } else {
    //Date is specified and must be validated
    if(isNaN(dateString)){
      date = new Date(dateString);  
    } else {
      date = new Date(parseInt(dateString));
    }
    if(isDateValid(date)){
      res.send({'unix':date.getTime(), 'utc': date.toUTCString()});  
    } else {
      res.send({"error":"Invalid Date"}); 
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function isDateValid(date){
  if (Object.prototype.toString.call(date) === "[object Date]") {
    // it is a date
    if (isNaN(date.getTime())) {  // d.valueOf() could also work
      // date is not valid
      return false;
    } else {
      // date is valid
      return true;
    }
  } else {
    // not a date
    return false;
  } 
}
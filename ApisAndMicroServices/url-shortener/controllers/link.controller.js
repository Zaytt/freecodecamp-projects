const shortid = require('shortid');
const Link = require('../models/link.model');
const validUrl = require('valid-url');
const dns = require('dns');

exports.test = (req, res) => {
  res.send('Greetings from the controller');
}
//Redirects to the original URL if the short URL is in the DB
exports.getUrl = function(req, res, next){
  let url = req.params.shortUrl;
  Link.findOne({short_url: url},'original_url short_url -_id', function(err, link){
    if(err) return next(err);
    if(link != null){
      res.redirect('https://'+ link.original_url);
    } else {
      res.send({'error': 'Short link not found'});
    }
    
  });
}

//Returns a new Short Url or an existing one if the original url is already in the db
exports.newUrl = (req, res, next) => {
  let url = req.body.url.replace(/(^\w+:|^)\/\//, '');
  dns.lookup(url, async function (err, addresses, family) {
    if(addresses){
      let link = await urlAlreadyExists(url);
      console.log('Link \n' + link);
      if(link){
        res.send(link);
      } else {
        //Create new Link obj
        link = new Link({ 
          original_url: url,
          short_url: shortid.generate()  
        })

        //Save that link
        link.save(function(err) {
          if(err){
            return next(err);
          }
          res.send({'original_url': link.original_url, 'short_url':link.short_url});
        });
        }
    } else {
      res.send({'error' : 'invalid URL'});
    }
    
  });
  
}

//Checks if the provided url is already in the DB
async function urlAlreadyExists(originalUrl) { 
  let link = await Link.findOne({original_url: originalUrl});
  if (link) { // already exists, so return info
    console.log(link);
    return link;
  } else {
    return false;
  }
}

//Removes a link from the DB
exports.deleteUrl = function(req, res, next){
  Link.remove({ original_url: req.params.url}, function(err){
    if(err) return next(err);
    res.send(req.params.url + ' deleted');
  })
}

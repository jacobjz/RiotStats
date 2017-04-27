var express = require('express');
var exphbs = require('express-handlebars');
var path=require('path');
var app = express();
var request = require('request');
var async = require('async');
app.set('views',path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', function(req,res){
  console.log("not search");
  res.render('main');
});
app.get('/about', function(req,res){
  console.log("not search");
   res.render('about', {layout: 'about.handlebars'});
});
app.get('/contact', function(req,res){
  console.log("not search");
   res.render('contact', {layout: 'contact.handlebars'});
});
app.get('/search/euw', function(req,res){
  console.log("/search");
  var data = {};
  var api_key = process.env.API_KEY;
  var s_toSearch = req.query.summoner.toLowerCase();
  var URL = 'https://euw.api.riotgames.com/api/lol/euw/v1.4/summoner/by-name/' + s_toSearch + '?api_key=' + api_key;

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
          data.id = json[s_toSearch].id;

          callback(null, data);
        } else {
          console.log(err);
        }
      });
    },
    function(data, callback){
    //  var URL ='https://euw.api.riotgames.com/api/lol/euw/v1.3/stats/by-summoner/'+data.id+'/ranked?api_key=' + api_key;
      request(URL, function(err, response, body) {
          if(!err && response.statusCode == 200) {
              var json = JSON.parse(body);
                callback(null, data);
          }else {
            console.log(err);
          }
        });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    res.render('main', {info: data});
  });
});
app.get('/search/na', function(req,res){
  console.log("/search/ew");
  var data = {};
  var api_key ='RGAPI-51e390ef-d1bd-4739-9d2e-fa925b7a33d9';
  var s_toSearch = req.query.summoner.toLowerCase();
  var URL = 'https://na.api.riotgames.com/api/lol/na/v1.4/summoner/by-name/' + s_toSearch + '?api_key=' + api_key;

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
          data.id = json[s_toSearch].id;

          callback(null, data);
        } else {
          console.log(err);
        }
      });
    },
    function(data, callback){
    //  var URL ='https://euw.api.riotgames.com/api/lol/euw/v1.3/stats/by-summoner/'+data.id+'/ranked?api_key=' + api_key;
      request(URL, function(err, response, body) {
          if(!err && response.statusCode == 200) {
              var json = JSON.parse(body);
                callback(null, data);
          }else {
            console.log(err);
          }
        });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    res.render('main', {info: data});
  });
});
app.get('/search/ne', function(req,res){
  console.log("/search");
  var data = {};
  var api_key ='RGAPI-51e390ef-d1bd-4739-9d2e-fa925b7a33d9';
  var s_toSearch = req.query.summoner.toLowerCase();
  var URL = 'https://eune.api.riotgames.com/api/lol/eune/v1.4/summoner/by-name/' + s_toSearch + '?api_key=' + api_key;

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
          data.id = json[s_toSearch].id;

          callback(null, data);
        } else {
          console.log(err);
        }
      });
    },
    function(data, callback){
    //  var URL ='https://euw.api.riotgames.com/api/lol/euw/v1.3/stats/by-summoner/'+data.id+'/ranked?api_key=' + api_key;
      request(URL, function(err, response, body) {
          if(!err && response.statusCode == 200) {
              var json = JSON.parse(body);
                callback(null, data);
          }else {
            console.log(err);
          }
        });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    res.render('main', {info: data});
  });
});
var port = Number(process.env.API_PORT);
app.listen(port);

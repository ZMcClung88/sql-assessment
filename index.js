var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });

    app.get('/api/users', function(req, res){
      db.getUsers(function(err, response){
        if(!err) {
          res.json(response);
        }
      })
    });
    app.get('/api/vehicles', function(req, res){
      db.getVehicles(function(err, response){
        if(!err) {
          res.json(response);
        }
      })
    });
    app.post('/api/users', function(req, res) {
      var params = [
        req.body.firstname,
        req.body.lastname,
        req.body.email
      ]
      db.addUser(params, function(err, response){
        if(!err){
            res.json(response);
            }
          })
        });
    app.post('/api/vehicles', function(req, res) {
        var params = [
            req.body.make,
            req.body.model,
            req.body.year,
            req.body.ownerId
            ]
        db.addVehicle(params, function(err, response){
            if(!err){
                res.json(response);
            }
          })
        });
    app.get('/api/:id/vehiclecount', function(req, res){
              db.vehicleCount(Number(req.params.id), function(err, response){
                if(!err) {
                  res.json(response);
                }
              })
            });
    app.get('/api/user/:id/vehicle', function(req, res){
            db.userVehicles(Number(req.params.id), function(err, response){
              if(!err) {
                res.json(response);

              }
            })
          });
    app.get('/api/vehicle', function(req, res){
            if(req.query.email) {
              db.usersEmail(req.query.email, function(err, response){
                if(!err) {
                  res.json(response);
                }
              })
            } else if(req.query.userLetters) {
              db.userFirstLetters(req.query.userLetters, function(err, response){
                if(!err) {
                  res.send(response);
                  }
                })
            }
          });
          app.get('/api/newervehiclesbyyear', function(req, res){
            db.vehiclesByYear(function(err, response){
              if(!err) {
                res.send(response);
              }
            })
          });
          app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res){
            db.changeOwner([Number(req.params.vehicleId), Number(req.params.userId)], function(err, response){
                if(!err){
                    res.send(response);
                }
             })
          });
          app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res){
            db.removeOwner([Number(req.params.vehicleId), null], function(err, response){
                if(!err) {
                    res.send(response);
                } else {
                  console.log(err)
                }
            })
        });
        app.delete('/api/vehicle/:vehicleId', function(req, res){
          db.deleteVehicle(Number(req.params.vehicleId), function(err, response){
              if(!err) {
                  res.send(response);
              }
          })
      });

})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;

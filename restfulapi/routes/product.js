var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET all data */
router.get('/', function(req, res, next) {
  
    MongoClient.connect(url, function (err, db) {
       
        if (err) throw err;
        var dbo = db.db("restfulapi");
        dbo.collection("products").find({}).toArray(function (err, result) {
            
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.console();
        });
    });

});
// end

/*Insert */

router.put('/', function (req, res, next) {
    
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("restfulapi");
        var obj = {tiltle:req.body.name,price:req.body.price}
        dbo.collection("products").insertOne(obj, function (err, res) {
            
            if (err) throw err;
            console.log("Inserted");
           // res.send("Inserted");
            db.close();

        })

    })
})
/* Delete */
router.delete('/', function (req, res, next) {
MongoClient.connect(url, function (err,db) {
    

    if (err) throw err;
    var dbo = db.db("restfulapi");
    var myobj = { tiltle : req.body.tiltle}
    dbo.collection("products").deleteOne(myobj, function (err, obj) {
        if (err) throw err;
        console.log("deleted");
        db.close();
    })
  })  
})

/* Update */


router.post('/', function (req, res, next) {

    MongoClient.connect(url, function (err, db) {
        
        var dbo = db.db("restfulapi");
        var myquery = { tiltle: "table" };
        var newupdated = { $set: { tiltle: "chair", price: "1200$" } };
        dbo.collection("products").updateOne(myquery, newupdated, function (err, res) {
            
            if (err) throw err;
            console.log("updated");
            db.close();
        })

    })

    })




module.exports = router;

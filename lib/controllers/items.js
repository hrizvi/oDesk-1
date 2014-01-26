'use strict';

var mongoose = require('mongoose'),
    Item = mongoose.model('Item');


exports.createItem = function (req, res, next) {
    var newItem = new Item(req.body);

    newItem.save(function(err, item) {
        if (err) {
            console.log(err);
            if (err.code === 11000){
                return res.send('Item already exists!', 400);
            }
            return res.send(err.message, 400);
        }

        res.send(item);
    });
};

exports.getItems = function(req, res) {

    console.log("In getItems...");

    Item.find({}).sort({ name: 1 }).exec(function(err, data){

        if(err) return res.send(err.message, 400);

        //console.log(data);

        res.send(data);
    });
};

exports.getItem = function(req, res) {

    if (!req.params.id){
        return res.send("Please provide an id", 400);
    }

    var query = { _id: req.params.id };

    Item.findOne(query, function(err, data){

        if(err) return res.send(err.message, 400);

        res.send(data);
    });

};

exports.updateItem = function(req, res) {

    if (!req.params.id){
        return res.send("Please provide an id", 400);
    }

    var query   = { _id: req.params.id };
    var options = { new: true };

    delete req.body._id;

    Item.findOneAndUpdate(query, req.body, options, function(err, item) {

        if(err) return res.send(err.message, 400);

        if (!item){
            return res.send("Item not found!", 400);
        }
        //console.log(item);

        res.send(item);

    });
};

exports.deleteItem = function(req, res) {

    if (!req.params.id){
        return res.send("Please provide an id", 400);
    }

    Item.remove({ _id: req.params.id }, function(err){
        if(err) return res.send(err.message, 400);

        res.send("Deleted!");
    });
};

function processItem(item, callback) {

    var query   = { _id: item._id };
    delete item._id;

    Item.update(query, item, callback);

}

function errorCallback(res){

    return function(err) {
        if (err) {
            console.log(err);
            res.send(err.message, 400);
        } else {
            console.log("No error");
            res.send("updated");
        }
    };
}

exports.updateItems = function(req, res) {

    if (!req.body.items || !req.body.items instanceof Array || req.body.items.length === 0){
        return res.send("Please provide items to update", 400);
    }

    var async = require('async');
    async.eachSeries(req.body.items, processItem, errorCallback(res));

};


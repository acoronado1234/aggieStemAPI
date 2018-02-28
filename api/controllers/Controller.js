`use strict`;

var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

//this will attempt to list all the tasks, will error out if fails
exports.list_all_tasks = function(req,res) {
    Task.find({}, function(err, task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

//this will attempt to create a task
exports.create_a_task = function(req,res){
    var new_task = new Task(req.body);
    new_task.save(function(err,task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

//this will attempt to read a task given
exports.read_a_task = function(req,res) {
    Task.findById(req.params.taskId, function(err,task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

//this will attempt to update a current task
exports.update_a_task = function(req,res){
    Task.findOneAndUpdate({_id: req.params.taskId}, 
        req.body, {new:true}, function(err,task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//this will attemp to delete a task
exports.delete_a_task = function(req,res) {
    Task.remove({
        _id: req.params.taskId
    }, function(err,task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted'});
    });
};
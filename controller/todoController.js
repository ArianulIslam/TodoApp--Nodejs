var bodyParser = require('body-parser');
var mongoose =require('mongoose');

//connect Database

  mongoose.connect("mongodb://" + process.env.IP + "/todoApp");
  
  mongoose.connection.on('error',function(){
   console.log('Could not connect to mongodb');
 });
// create a schema --this is like blueprint of data

var todoSchema = new mongoose.Schema({
  item : String
  
});

var Todo = mongoose.model('Todo',todoSchema);

// var itemOne = Todo({item:'buy birani'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
  
// });





//var data =[{item:'get milk'},{item:'walk with her'},{item:'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function(app){
    
    app.get('/todo',function(req,res){
      
      Todo.find({},function(err,data){
        if(err) throw err;
         res.render('todo', { dummy: data });
      });
        
       // res.render('todo', { dummy: data });
        
    });
    
    app.post('/todo',urlencodedParser,function(req,res){
   //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err,data){
     
     if (err) throw err;
     res.json(data);
     
   });
        // data.push(req.body);
         //res.json(data);
        
    });
    
    
    app.delete('/todo/:item',function(req,res){
      
      Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      });
        
        // data = data.filter(function(todo){
        //   return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        
        // res.json(data);
        
    });
        
    
}
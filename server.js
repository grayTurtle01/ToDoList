express = require('express')
require('dotenv').config()

// MongoDB
MongoClient = require('mongodb')
dbName = "miDB"
//uri = "mongodb://localhost/"+dbName 

uri = process.env.URI

let db

MongoClient.connect(uri, {useUnifiedTopology: true})
  .then( client => {
      console.log("db working")
      db = client.db(dbName)
    })


server = express()

// MiddleWares
server.use( express.json() ) // req.body for fetch
server.use( express.urlencoded({extended: true}) ) //req.body by <form>
server.use( express.static('public') )

server.set('view engine', 'ejs')

// Routes
server.get("/", (req,res) => {    
  db.collection('tasks').find().toArray()
  .then( data =>{
    //console.log(data)
    res.render("index.ejs", {tasks : data} )
   })
})

server.post("/addTask", (req,res) => {
  //console.log( req.body )
  new_task = req.body
  new_task.isDone = false
  
  db.collection('tasks').insertOne( new_task )
    .then( x => {
        console.log("Product Added")
     })
     
  //~ res.send( JSON.stringify({}) )
  res.redirect("/")
})

server.delete("/deleteTask/:id", (req,res) => {
  req_id = req.body.id
  _id = MongoClient.ObjectId( req_id )
  
  db.collection('tasks').deleteOne( {"_id": _id})
    .then( x =>{
      console.log("Task Deleted")
      res.send( JSON.stringify("Task Deleted") )
    })
  
})

server.put("/updateTask/:id", (req,res) => {
  req_id = req.params.id
  //console.log( req_id, req.body )
  _id = MongoClient.ObjectId( req_id )
  
  db.collection('tasks').findOneAndUpdate( 
     {"_id": _id},
     {
       $set:{
          task: req.body.task
       }
     },
     {
       upsert: false
     }
     
     )
    .then( x =>{
      console.log("Task Updated")
      res.send( JSON.stringify("Task Updated") )
    })
  
   //res.send( JSON.stringify({}) )
})

server.put("/toogleTask/:id", (req,res) => {
  req_id = req.params.id
  console.log(  req.body )
  _id = MongoClient.ObjectId( req_id )
  
  db.collection('tasks').findOneAndUpdate( 
     {"_id": _id},
     {
       $set:{
          isDone: req.body.isDone
       }
     },
     {
       upsert: false
     }
     
     )
    .then( x =>{
      console.log("Task Toogled")
      res.send( JSON.stringify("Task Toogled") )
    })
  
   //res.send( JSON.stringify({}) )
})


PORT = process.env.PORT || 8000
server.listen(PORT, console.log(`Server running on port ${PORT}`))

const mongodb= require('mongodb');
const MongoClient =mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const ObjectId = mongodb.ObjectID
MongoClient.connect(connectionURL,{useUnifiedTopology:true},(error,client)=>{
  if(error){
   return   console.log(`unable to connect`,error)
  }
 const db = client.db(databaseName)

 db.collection('users').deleteOne(
     {
         _id: new ObjectId("60c0306376ff181c53bc8920")
     }

 ).then((res)=>{
    console.log(res)
 }).catch((err)=>{
     console.log(err)
 })


})
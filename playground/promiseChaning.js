require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("60ceff69562c132de3bd413e").then((user)=>{
  
// }).then(()=>{
//    return Task.countDocuments({ isCompleted:false})
// }).then((count)=>{
//    console.log(count)
// })


const deleteAndCount = async(id)=>{
   const del = await Task.findByIdAndDelete("60ceff69562c132de3bd413e")
   const count = await Task.countDocuments({ isCompleted: false })
   return count
}

deleteAndCount("60ceffb63fea442ea6df1269").then((count)=>{
  console.log(count)
}).catch((err)=>{
   console.log(err)
})
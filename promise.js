const doPromise = new Promise((resolve,reject)=>{
   setTimeout(()=>{
       resolve([6, 5, 6, 7])
       reject("rrrrr")

    
   },2000)
})
doPromise.then((data)=>{
  console.log(data)
})
.catch((err)=>{
  console.log(err)
})
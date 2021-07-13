const express = require('express');
const Task = require('../models/task')
const router = new express.Router();
const auth = require('../middleware/auth')

// GET /tasks?completed=true
// GET /tasks?completed=true&limit=2&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req, res) => {
    const match ={}
    const sort ={}
      if(req.query.completed){
          match.isCompleted = req.query.completed ==="true"
      }
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1]==="desc"? -1 : 1
    }
    try {
        await req.user.populate({
            path:"tasks",
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }


})
router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})
router.post('/tasks',auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }


})
router.patch('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["isCompleted", "description"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
         const task  =await Task.findOne({_id:req.params.id,owner:req.user._id})
        if (!task) {
            return res.status(404).send(task)
        }
          updates.forEach((update)=>{
            task[update]= req.body[update]
          })
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, useFindAndModify: true })
       await task.save();
        res.send(task)
    } catch (e) {
        res.status(500).send("server error")
    }
})
router.delete('/tasks/:id',auth,async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        res.send({ success: "ok" })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
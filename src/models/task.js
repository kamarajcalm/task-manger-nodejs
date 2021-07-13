
const mongoose = require('mongoose');
const validator = require("validator");
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,

    },
    isCompleted: {
        type: Boolean,
        default: false,

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true, 
        ref:'user'
    }
},{
    timestamps:true
})

taskSchema.pre('save',async function(next){
    const task = this
     console.log("before saving task")
    next()
})
const Task = mongoose.model('Task',taskSchema)

module.exports = Task

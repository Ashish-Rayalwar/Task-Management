
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const taskSchema = new mongoose.Schema({

    title: {
        type: String, require: true
    },

    description: {
        type: String, requires: true
    },

    status: {
        type: String, required: true, enum: ["open", "in-progress", "completed"]
    },

 userId: {
        type: ObjectId,
        ref: "User"
    }

}, { timestamps: true })


module.exports = mongoose.model("Task", taskSchema)
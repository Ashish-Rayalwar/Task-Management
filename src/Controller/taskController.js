const taskModel = require("../model/taskModel")






const createTask = async (req, res) => {

    try {
        let data = req.body

        let { title, description, status } = data

        if (!(["open", "in-progress", "completed"].includes(status))) return res.status(400).send({ status: false, message: `You can enter only "open", "in-progress", "completed" in status!` })

        let userId = req.token.payload.userId

        let task = await taskModel.create({ title: title, description: description, priority: priority, userId: userId })

        return res.status(201).send({ status: true, message: "Successfully task created", data: task })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}


const getTask = async (req, res) => {

    try {

        const userId = req.tokenDetails.userId

        let getTask = await taskModel.find({ status: false, userId: userId })

        return res.status(200).send({ status: true, data: getTask })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



const updateTask = async (req, res) => {

    try {

        let data = req.body
        let taskId = req.params.taskId

        if (data.priority) {
            if (!(["open", "in-progress", "completed"].includes(data.status))) return res.status(400).send({ status: false, message: `You can enter only "open", "in-progress", "completed" in status!` })
        }

        let updateTask = await taskModel.findOneAndUpdate({ _id: taskId, status: false, }, { ...data }, { new: true })
        
        if (!updateTask) return res.status(400).send({ status: false, message: "task not found or deleted " })

        return res.status(200).send({ status: true, message: "successfully Updated", data: updateTask })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



const deleteTask = async (req, res) => {

    try {

        let taskId = req.params.taskId

        let check = await taskModel.findOneAndUpdate({ _id: taskId, status: false }, { status: true })

        if (!check) return res.status(400).send({ status: false, message: "Already Deleted!" })

        return res.status(200).send({ status: true, message: "successfully deleted" })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createTask, getTask, updateTask, deleteTask }
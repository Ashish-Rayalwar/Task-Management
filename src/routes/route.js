
const express = require('express');
const router = express.Router();

const { loginUser,logout } = require('../Controller/userController')
const { createTask, getTask, updateTask, deleteTask } = require("../controller/taskController");
const { verifyToken,verifyTokenAndAuthorization } = require('../middleware/auth');


router.post("/login", loginUser)
router.post("/logout", logout)




router.post("/createtask", verifyToken, createTask)

router.get("/getTask", verifyToken, getTask)
router.put("/updateTask/:taskId",verifyTokenAndAuthorization, updateTask)
router.delete("/deleteTask/:taskId", verifyTokenAndAuthorization, deleteTask)





router.all("/**", (req, res) => {
    return res.status(404).send({ status: false, msg: "This API request is not available!" })
});





module.exports = router;   

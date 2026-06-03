const express = require("express");

const router = express.Router();

const checkAuthentication =
    require("../middleware/checkAuthentication");

const taskController =
    require("../controllers/taskControllers");

router.get(
    "/",
    checkAuthentication,
    taskController.listTasks
);

router.post(
    "/",
    checkAuthentication,
    taskController.createTask
);

router.patch(
    "/:task_id",
    checkAuthentication,
    taskController.updateTask
);

router.delete(
    "/:task_id",
    checkAuthentication,
    taskController.deleteTask
);

module.exports = router;
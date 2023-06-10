const express = require("express");
const router = express.Router();
const Trainees = require("../model/todoModel");
const blogControlers = require("../controller/blogControler");

router.get("/", blogControlers.get_todos);

router.get("/create",blogControlers.todo_create);
router.post("/", blogControlers.todo_post);
// delete route
router.get("/delete/:id",blogControlers.todo_delete);
// edit route
// app.get('/todos/edit/:id', (req, res) => {
//    const id = req.params.id
//    console.log(id)
//    Trainees.findById(id)
//      .then((result) => {
//        res.render('edit', { trainees: result})
//      })
//      .catch((error) => {
//        console.log(error)
//      })
// })
// specific post,params
router.get("/:id",blogControlers.todo_specific);





module.exports = router;

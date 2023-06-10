const Trainees = require("../model/todoModel");



const get_todos = async(req,res)=>{
    try {
        const allTrainees = await Trainees.find()
    
        res.render('index', { title: 'EJS Home Page', trainees: allTrainees })
      } catch (err) {
        console.log(err)
      }
}


const todo_create = (req,res)=>{
    res.render("createList", { title: "EJS create-todo Page" });

}

const todo_post = (req,res)=>{
    console.log(req.body);

  const savedTrainee = new Trainees(req.body);
  savedTrainee
    .save()
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
}

const todo_specific = (req,res)=>{
    const id = req.params.id;
  console.log(id);
  Trainees.findById(id)
    .then((result) => {
      res.render("details", { trainees: result, title: "Blog Details" });
    })
    .catch((error) => {
      console.log(error);
    });
}

const todo_delete = (req,res)=>{
    Trainees.findByIdAndDelete(req.params.id).then((result) => {
        res.redirect("/todos");
      });

}

module.exports = {
    get_todos,
    todo_create,
    todo_post,
    todo_specific,
    todo_delete
}
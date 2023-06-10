const express = require('express');
const router = express.Router();
const Trainees = require('../model/todoModel');


router.get('/todos', async (req, res) => {
    try {
      const allTrainees = await Trainees.find()
  
      res.render('index', { title: 'EJS Home Page', trainees: allTrainees })
    } catch (err) {
      console.log(err)
    }
  })
  
  router.post('/todos', (req, res) => {
    console.log(req.body)
  
    const savedTrainee = new Trainees(req.body)
    savedTrainee
      .save()
      .then((result) => {
        res.redirect('/todos')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  // delete route
  router.get('/todos/delete/:id', (req, res) => {
    Trainees.findByIdAndDelete(req.params.id).then((result) => {
      res.redirect('/todos')
    })
  })
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
  router.get('/todos/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Trainees.findById(id)
      .then((result) => {
        res.render('details', { trainees: result, title: 'Blog Details' })
      })
      .catch((error) => {
        console.log(error)
      })
  })
  
  router.get('/todo/create', (req, res) => {
    res.render('createList', { title: 'EJS create-todo Page' })
  })


  module.exports = router
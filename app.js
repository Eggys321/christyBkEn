const express = require('express')
const mongoose = require('mongoose')
const Trainees = require('./model/todoModel')
// console.log(Trainees);

const app = express()
const port = process.env.PORT || 8080
// config ejs and dotenv
app.set('view engine', 'ejs')
require('dotenv').config()
// enviromental variable
const db_url = process.env.DBURL

// custom middleware
// app.use((req,res,next)=>{
//     console.log('a req was jux made');
//     console.log(req.method);
//     console.log(req.path);
//     next()
// })
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// mongoDB connection
const connect = () => {
  mongoose.connect(db_url)
  try {
    console.log('DB connected successfully')
  } catch (err) {
    console.log(err)
  }
}
//   .then(() => console.log('DB connected successfully'))
//   .catch((err) => console.log(err))

// TESTING AWA MODEL AND DB
// for saving 2d DB
app.get('/add-trainee', async (req, res) => {
  const TRAINEES = new Trainees({
    name: 'Sam',
    profession: 'fron end',
    description: 'He sabi code',
  })
  // TRAINEES.save()
  // .then((result)=>{
  //     res.send(result)
  // })
  // .catch((err)=>{
  //     console.log(err);
  // })
  try {
    const savedTrainees = await TRAINEES.save()
    res.send(savedTrainees)
  } catch (err) {
    console.log(err)
  }
})

// for getting all info from d DB
// app.get('/all-trainees',async(req,res)=>{
//   try {
//     const allTrainees = await Trainees.find()
//     res.send(allTrainees)
//   } catch (err) {
//     console.log(err)
//   }
//   // .then((results)=>{
//   //   res.send(results)

//   // })
//   // .catch((err)=>{
//   //   console.log(err);
//   // })
// })
// To get a single trainee
// app.get('/single-trainee',async(req,res)=>{
//   try{
//     const singleTrainee = await Trainees.findById('647df2eb997cd86341fb583b')
//     res.send(singleTrainee)

//   }
//   catch(err){
//     console.log(err);

//   }
//   // Trainees.findById('647df2eb997cd86341fb583b')
//   //   .then((result) => {
//   //     res.send(result)
//   //   })
//   //   .catch((err) => {
//   //     console.log(err)
//   //   })

// })

// routes
// const trainees = [
//   { name: 'Christy', profession: 'front-end dev' },
//   { name: 'Ejiro', profession: 'back-end dev' },
//   { name: 'Henry', profession: 'mobile app dev' },
//   { name: 'John', profession: 'desktop dev' },
// ]

app.get('/', (req, res) => {
  res.redirect('/todos')
})
app.get('/about', (req, res) => {
  res.render('about', { title: 'EJS About Page' })
})

// todo routes
app.get('/todos', async (req, res) => {
  try {
    const allTrainees = await Trainees.find()

    res.render('index', { title: 'EJS Home Page', trainees: allTrainees })
  } catch (err) {
    console.log(err)
  }
})

app.post('/todos', (req, res) => {
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
app.get('/todos/delete/:id', (req, res) => {
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
app.get('/todos/:id', (req, res) => {
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

app.get('/todo/create', (req, res) => {
  res.render('createList', { title: 'EJS create-todo Page' })
})
app.use((req, res) => {
  res.status(404).render('404', { title: 'EJS Error' })
})

// server
app.listen(port, () => {
  connect()
  console.log(`server running on port ${port}`)
})

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
app.get('/add-trainee', async (req, res) => {
  const TRAINEES = new Trainees({
    name: 'John',
    profession: 'Senior desktop dev',
    description: 'He dey code v.well!',
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
// routes
const trainees = [
  { name: 'Christy', profession: 'front-end dev' },
  { name: 'Ejiro', profession: 'back-end dev' },
  { name: 'Henry', profession: 'mobile app dev' },
  { name: 'John', profession: 'desktop dev' },
]

app.get('/', (req, res) => {
  res.render('index', { title: 'EJS Home Page', trainees })
})
app.get('/about', (req, res) => {
  res.render('about', { title: 'EJS About Page' })
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
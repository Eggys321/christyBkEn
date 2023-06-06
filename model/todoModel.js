// require mongoose
// From mongoose we use a method which is Schema(dis defines d structure of d doc we wud store in a collection, its d tin dt wraps arand,note the S in Schema is capitalized )

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const traineeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  }
},{timestamps:true})

// lets create awa model(model is wt surrounds d Schema and provides us wit an interface by wich to communicate with awa DB)

const Trainees = mongoose.model('Trainee', traineeSchema)

module.exports = Trainees
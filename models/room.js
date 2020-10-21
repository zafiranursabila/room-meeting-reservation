import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    room_number: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: false,
    },
    start_date: {
      type: Date,
      required: true,
    },
    exp_date: {
      type: Date,
      required: true,
    },
    agenda: {
      type: String,
      required:true
    },
    reserved :{
      type : String,
      required:false
    },
  },
  {
    timestamps: true,
  }
)

const Room = mongoose.model('Room', userSchema)

export default Room
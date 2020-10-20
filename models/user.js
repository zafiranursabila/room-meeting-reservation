import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    id_karyawan: {
      type: String,
      required: true,
    },
    divisi: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required:true
    }
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
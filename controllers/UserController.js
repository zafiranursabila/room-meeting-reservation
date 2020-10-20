import User from './../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
// import Conf from './../config.js';

const userRouter = express.Router();

//@desc add new user
//@route POST/api/user/add
userRouter.post('/add', async (req, res) => {
    try{
        const{
            nama,
            username,
            id_karyawan,
            divisi,
            password
        } = req.body;

        //digit angka mau berapa banyak
        var saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            "nama":nama,
            "username":username,
            "id_karyawan":id_karyawan,
            "divisi":divisi,
            "password": hashedPw
        });

        const createdUser = await newUser.save();
  
        res.status(201).json(createdUser);

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

// userRouter.post('/register', async (req, res) => {
//     try{
//         var hashedPassword = bcrypt.hashSync(req.body.password, 8);

//         User.create({
//             nama : req.body.nama,
//             username : req.body.username,
//             id_karyawan : req.body.id_karyawan,
//             divisi : req.body.divisi,
//             password : hashedPassword
//         },
//             function (err, user) {
//                 console.log(err)
//             if (err) return res.status(500).send("There was a problem registering the user.")
//             res.status(200).send(`${user} Berhasil Daftar`);
//             }); 
//     } 
//     catch(error){
//         res.status(500).json({ error: error})
//     }
// })


//@desc Get all user
//@route GET/api/user/get
userRouter.get('/get', async (req, res) => {
    const users = await User.find({})
  
    if(users) {
      res.json(users)
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  })
  

//@desc Get a user by ID
//@route GET/api/user/get/:id
userRouter.get('/get/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  })


export default userRouter;
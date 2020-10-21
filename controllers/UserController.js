import User from './../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
// import Conf from './../config.js';

const userRouter = express.Router();

//@desc add new user
//@route POST/api/user/add
userRouter.post('/register', async (req, res) => {
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
        const token = jwt.sign(
            // payload data
        {
            username: user.username,
            id: user._id
        },
        process.env.TOKEN_SECRET,{expiresIn: "2 h"}
        )
        res.status(200).json({
        error: null,
        data: {
            token
        }
        })
  
        res.status(201).json(createdUser);

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})
userRouter.get('/login', async(req,res)=>{
 
  const user = await User.findOne({username : req.body.username})
  console.log(user)
  if (!user) return res.status(400).json({ error: "Username is wrong" })
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" })
    const token = jwt.sign(
        // payload data
    {
        username: user.username,
        id: user._id
    },
    process.env.TOKEN_SECRET,{expiresIn: "12 h"}
    )
    res.status(200).json({
    error: null,
    data: {
        token
    }
    })
})

userRouter.get('/logout', async(req,res)=>{
  const token = null
  res.status(200).send({ auth: false, token: token });
})



export default userRouter;
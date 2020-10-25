import Room from './../models/room.js';
import express from 'express';

const roomRouter = express.Router();

roomRouter.post('/pesan-ruang', async (req, res) => {
  try{
      const{
          room_number,
          capacity,
          start_date,
          exp_date,
          agenda,
          reserved,
      } = req.body;
      const newRecord = new Room({
        "room_number":room_number,
        "capacity":capacity,
        "start_date":start_date,
        "exp_date":exp_date,
        "agenda": agenda,
        "reserved":reserved
    });

    const createdRoom = await newRecord.save();
    res.status(201).json(createdRoom);

  }
  catch(err){
      res.status(500).json({ error: err})
  }
})

roomRouter.get('/list-room', async(req, res) => {
  const rooms = await Room.find({})

  if(rooms) {
      res.json(rooms)
  } else {
      res.status(404).json({
          message: 'Room not found'
      })
  }
})


export default roomRouter;
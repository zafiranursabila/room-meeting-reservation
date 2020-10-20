userRouter.post('/pesan-ruang', async (req, res) => {
  try{

      const{
          room_number,
          capacity,
          start_date,
          exp_date,
          agenda,
          reserved
      } = req.body;
      
      const currentUser = await new Promise((resolve, reject) =>{
          User.find({"username": username}, function(err, user){
              if(err)
                  reject(err)
              resolve(user)
          })
      })
      
      //cek apakah ada user?
     if(currentUser[0]){
          //check password
          bcrypt.compare(password, currentUser[0].password).then(function(result) {
              if(result){
                  //urus token disini
                  
                  res.status(201).json({"status":"logged in!"});
              }
              else
                  res.status(201).json({"status":"wrong password."});
          });
      }
      else{
          res.status(201).json({"status":"username not found"});
      }

  }
  catch(error){
      res.status(500).json({ error: error})
  }
})
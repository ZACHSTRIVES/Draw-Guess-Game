module.exports = function(app, db) {
    const collection = 
    app.post('/create_room', (req, res) => {
      const room = { room_num: req.body.room_num, room_name: req.body.room_name };
      db.collection('rooms').insert(room, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  };
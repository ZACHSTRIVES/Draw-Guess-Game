module.exports = function(app, db) {
    app.get('/get_all_rooms', (req, res) => {
        var query= db.collection('rooms').find().toArray(function(err, result) { 
            //如果存在错误
            if(err)
            {
                console.log('Error:'+ err);
                return;
            } 
            //调用传入的回调方法，将操作结果返回
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        
        });
        
    });
  };
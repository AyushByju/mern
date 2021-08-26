const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends')

mongoose.connect("mongodb://localhost:27017/Mern?readPreference=primary&appname=MongoDB%20Compass&ssl=false", 
{useNewUrlParser: true}
);

app.get("/insert", async (req, res) => {
    const friend = new FriendModel({ name: "Jessic", age: 38 });
    await friend.save();
    res.send("Inserted DATA");
  });
  

app.get("/read", async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
});

app.listen(3001, () => {
    console.log('you are connected!');
});
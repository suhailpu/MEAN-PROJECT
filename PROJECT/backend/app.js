const express = require('express');
const ProductData = require('./src/model/Productdata');
const User = require('./src/model/user')
const cors = require('cors');
const jwt = require('jsonwebtoken')
var bodyparser = require('body-parser');

var app = new express();
app.use(cors());
app.use(bodyparser.json())
app.get('/students',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.find()
                    .then(function(students){
                        res.send(students);
                    });
});
app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var student = {
        studentId : req.body.student.studentId,
        studentName : req.body.student.studentName,
       
       studentDob : req.body.student.studentDob,
       markEng : req.body.student.markEng,
       markMath : req.body.student.markMath,
       markSci : req.body.student.markSci,
        imageUrl : req.body.student.imageUrl
    }
    
    var student = new ProductData(student);
    student.save();
});


//delete
app.delete("/delete/:id", function(req,res){
    const id = req.params.id;
   ProductData.findByIdAndRemove(id)
  .then(()=>{
      res.status(200).json({id});
  })


})

app.get('/edit/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ProductData.findOne({ _id: id })
        .then(function(student) {
            res.send(student);
        });
});
app.post('/update', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("reqbody" + req.body);
    var student = {
        _id: req.body.student._id,
        studentId : req.body.student.studentId,
        studentName : req.body.student.studentName,
       
       studentDob : req.body.student.studentDob,
       markEng : req.body.student.markEng,
       markMath : req.body.student.markMath,
       markSci : req.body.student.markSci,
      
        imageUrl: req.body.student.imageUrl
    }
    ProductData.findOne({ _id: student._id })
        .then(function(studentret) {
            if (!studentret) {
                return next(new Error('Could not load Document'));
            }
            else {
                var studentupdate = new ProductData(student);
                console.log("findOne" + studentret)
                // studentupdate.save();
                console.log("findOne update" + studentupdate)
                ProductData.findByIdAndUpdate(studentupdate._id, studentupdate, (er, updated) => {
                    console.log("updated" + updated);
                });
            }
        });
});

app.post('/login',(req,res)=>{
    let userData = req.body;
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            if(!user){
               
                res.status(401).send('Invalid Email')
            }else
            if(user.password !== userData.password){
                
                res.status(401).send('Invalid Password')
            }
            else{
                let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
                // res.status(200).send(user)
            }
            
        }
    })
})
app.post('/result',(req,res)=>{
    let id = req.body.id;
    ProductData.findOne({_id:id},(err,user)=>{
        if(err){
            console.log(err)
        }
            else{
              
            res.status(200).send({user})
                // res.status(200).send(user)
            }
            
        })
    })

app.post('/studentform',(req,res)=>{
    let userData = req.body.item;
  
   ProductData.findOne({studentId:userData.studentId,studentName:userData.studentName, studentDob:userData.studentDob},(err,item)=>{
        if(err){
            console.log(err)
        }else{
            if(!item){
                res.status(401).send('Invalid id')
            }
            else{
             console.log(item)
           
            res.json({"item":item})
                // res.status(200).send(user)
            }
            
        }
    })
})

app.post('/register', (req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err)
        }
       else{
           let payload = {subject:user._id}
           let token = jwt.sign(payload,'secretKey')
           res.status(200).send({token})
           console.log(registeredUser)
        }
    })
})
app.listen(3000, function(){
    console.log("listening to port 3000");
});
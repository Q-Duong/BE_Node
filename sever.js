const express = require('express')
const mongoose = require('mongoose')
const os = require("os");
const formData = require('express-form-data');
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port = 3001

app.use(express.json());

mongoose.connect(
    "mongodb+srv://root:Hqd800100@cluster0.vrbhq.mongodb.net/LVTN?retryWrites=true&w=majority",
   {useNewUrlParser:true}
)
const db = mongoose.connection
db.on("err",console.error.bind(console,"connection error : "))
db.once("open",()=>{
   console.log("connected to MongoDB")
})
app.use(cors({
    origin:"*",
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
    preflightContinue:false,
    optionSuccessStatus:204,
    credentials: true
}))

app.use('/',router)
app.listen(port , () =>{
    console.log(`Port ${port}`)
})



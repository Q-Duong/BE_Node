const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port = 3001

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
app.use(express.json());
app.use('/',router)
app.listen(port , () =>{
    console.log(`Port ${port}`)
})



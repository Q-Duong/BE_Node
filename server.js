require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port  = process.env.PORT | 3001

mongoose.connect(
    process.env.MONGO_URI,
   {useNewUrlParser:true}
)
const db = mongoose.connection
db.on("err",console.error.bind(console,"connection error : "))
db.once("open",()=>{
   console.log("connected to MongoDB")
})

app.use(express.json());
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



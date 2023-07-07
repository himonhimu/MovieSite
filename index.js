//https://docs.google.com/document/d/1XX7BBa0fSwW0cjU-yMJFcHv993vnqPEbdwztSkz3Cfs/edit?pli=1

const express = require("express");
const connectDB = require("./config/config");
require('dotenv').config()
const app = express();

const AdminUserRouter = require("./router/AdminUserRoute");
const UserRouter = require("./router/UserRoute");
var bodyParser = require('body-parser');
const MovieRouter = require("./router/MovieRoute");

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())


app.listen(process.env.PORT, async ()=>{
    console.log(`serveris running at http://localhost:${process.env.PORT}`);
    await connectDB()
})
app.get('/', (req, res)=>{
    res.send('welcome to movei site api')
})

app.use('/admin_user', AdminUserRouter)
app.use('/user', UserRouter)
app.use('/movie', MovieRouter)
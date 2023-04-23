const mongoose=require('mongoose');
const dotnev = require('dotenv')
mongoose.set("strictQuery", false);

dotnev.config({path:"Config/config.env"})
const connectToMongo = ()=>{
    mongoose.connect("mongodb+srv://krish_durole:chanakya41kl@cluster0.xzrsj.mongodb.net/kd?retryWrites=true&w=majority" ,{
        useNewUrlParser:true,
        useUnifiedTopology :true
    }).then(con=>{
        console.log(`mognodb Database connected with Host:${con.connection.host}`)
    })
}
// const index = require('../server/index')
module.exports = connectToMongo
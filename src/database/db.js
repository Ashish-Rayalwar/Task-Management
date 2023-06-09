const  mongoose  = require("mongoose")
mongoose.set("strictQuery", true);


const dbConnection = async (url) =>{
    try {
        await mongoose.connect(url,{useNewUrlParser:true})
        console.log("database connected");
    } catch (error) {
        console.log("error while db connection");
    }
}

module.exports = {dbConnection}
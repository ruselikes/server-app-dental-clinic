const express = require("express")
const config = require("config")
const mongoose = require("mongoose");
const app = express()
const PORT = config.get("port")

app.use("/api/auth",require("./routes/auth.routes"))
async function startApp(){
    try {
        await mongoose.connect(config.get("mongooUri"))

        app.listen(PORT,()=> console.log(`App has been started on ${PORT} `))
    }catch (e){
        console.log("Server Error",e.message)
        process.exit(1) //выходим из процесса node.js
    }
}
startApp()

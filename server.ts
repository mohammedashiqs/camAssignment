import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import camera from "./src/routes/camera"
import cameraNetworks from "./src/routes/cameraNetworks"


const app:express.Application = express()

app.use(express.json())


dotenv.config()

const port: string | undefined = process.env.PORT
let dbUrl: string | undefined = process.env.MONGODB_URL

if(dbUrl){
    mongoose.connect(dbUrl).then((resoponse)=>{
        console.log('Connected to mongodb successfully');
        
    }).catch((err)=>{
        console.log(err);
        process.exit(1)  //stops the nodejs process
        
    })
    
    }


app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send("Welcome to rest api")
})

//router configuration
app.use('/cameras', camera)
app.use('/cameranetworks', cameraNetworks)

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
    
})
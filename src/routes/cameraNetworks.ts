import express from 'express'


const cameraNetworksRouter : express.Router = express.Router();

cameraNetworksRouter.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        msg: "From cameraNetworksRouter router"
    })
})

export default cameraNetworksRouter
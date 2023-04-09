import express from 'express'
import { ICameraNetwork } from '../cameraNetwork/models/ICameraNetwork';
import { createCameraNetwork } from '../cameraNetwork/services/cameraNetworkServices';


const cameraNetworksRouter: express.Router = express.Router();



cameraNetworksRouter.post('/cameraNetwork', async (req: express.Request, res: express.Response, next) => {

    try {
        let cameraNetworkDetails: ICameraNetwork = req.body
        /* todo registraion logic */

        let createdCameraNetwork = await createCameraNetwork(cameraNetworkDetails)


        res.status(200).json({
            msg: "Camera Network created successfully",
            createdCameraNetwork: createdCameraNetwork
        })

    } catch (err) {

        next(err)

    }

})

export default cameraNetworksRouter



cameraNetworksRouter.get('/cameraNetwork', (req: express.Request, res: express.Response) => {


    res.status(500).json({
        msg: "get all the cameraNetworks"
    })

})



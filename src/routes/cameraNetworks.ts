import express from 'express'
import { ICameraNetwork } from '../cameraNetwork/models/ICameraNetwork';
import {
    createCameraNetwork,
    getAllCameraNetworks
} from '../cameraNetwork/services/cameraNetworkServices';


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

cameraNetworksRouter.get('/cameraNetwork', async (req: express.Request, res: express.Response, next) => {


    try {

        //todo get all cameras logic
        let cameraNetworks = await getAllCameraNetworks()

        res.status(200).json({
            msg: "Camera networks fetched successfully",
            cameraNetworks: cameraNetworks
        })


    } catch (error) {
        next(error)
    }


})

export default cameraNetworksRouter







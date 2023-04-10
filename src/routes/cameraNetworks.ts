import express from 'express'
import { ICameraNetwork } from '../cameraNetwork/models/ICameraNetwork';
import {
    addCameraToCameraNetwork,
    createCameraNetwork,
    getAllCameraNetworks,
    getCameraNetwork,
    removeCameraNetwork,
    updateCameraNetwork
} from '../cameraNetwork/services/cameraNetworkServices';
import mongoose from 'mongoose';


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
            data: { ...cameraNetworks[0] }
        })


    } catch (error) {
        next(error)
    }


})


cameraNetworksRouter.put('/cameraNetwork/:cameraNetworkId', async (req: express.Request, res: express.Response, next) => {

    try {
        const cameraNetworkId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.cameraNetworkId)
        let cameraNetworkDetails: ICameraNetwork | null = req.body.cameraNetwork
        let cameras = req.body.cameras


        if (cameraNetworkDetails != null) {
            //todo update cameraNetwork logic

            let updatedCameraNetwork = await updateCameraNetwork(cameraNetworkId, cameraNetworkDetails)
            if (updatedCameraNetwork) {
                if (cameras) {
                    //todo add cameras logic
                    await addCameraToCameraNetwork(cameraNetworkId, cameras)
                }
                res.status(200).json({ msg: "camera Network updated successfully" })
            } else res.status(400).json({ msg: "No cameraNetwork found" })
        } else res.status(400).json({ msg: "Please Provide the cameraNetwork Details" })



    } catch (error) {
        next(error)
    }

})


cameraNetworksRouter.delete('/cameraNetwork/:cameraNetworkId', async (req: express.Request, res: express.Response, next) => {

    try {

        const cameraNetworkId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.cameraNetworkId)
        //todo deletion logic
        let removedCameraNetwork = await removeCameraNetwork(cameraNetworkId)

        if (removedCameraNetwork) {
            res.status(200).json({
                msg: "Camera Network removed Successfully",
                removedCameraNetwork: removedCameraNetwork
            })
        }

    } catch (error) {
        next(error)
    }


})


cameraNetworksRouter.get('/cameraNetwork/:cameraNetworkId', async (req: express.Request, res: express.Response, next) => {

    try {
        const cameraNetworkId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.cameraNetworkId)

        let cameraNetworkDetails = await getCameraNetwork(cameraNetworkId)
        console.log(cameraNetworkDetails);
        
        res.status(200).json({
            msg: "cameraNetwork fetched successfull",
            cameraNetwork: cameraNetworkDetails
        })

    } catch (error) {
        next(error)
    }
})






export default cameraNetworksRouter







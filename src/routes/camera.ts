import express from 'express'
import { ICamera } from '../camera/models/ICamera';
import Camera from '../camera/models/camera';
import {
    createCamera,
    getAllCameras,
    getCamera,
    updateCamera,
    removeCamera
} from '../camera/services/cameraServices';
import mongoose from 'mongoose';



const cameraRouter: express.Router = express.Router();


cameraRouter.post('/camera', async (req: express.Request, res: express.Response, next) => {

    try {
        let camera: ICamera = req.body
        /*  todo registration logic */

        let createdCamera = await createCamera(camera)

        res.status(200).json({
            msg: 'camera created successfully',
            createdCamera: createdCamera
        })
    }
    catch (error) {
        next(error)

    }
})



cameraRouter.get('/cameras', async (req: express.Request, res: express.Response, next) => {


    try {
        //todo get all cameras logic

        let camera = await getAllCameras()

        res.status(200).json({
            camera: camera
        })
    }
    catch (err) {
        next(err)
    }
})


cameraRouter.get('/camera/:cameraId', async (req: express.Request, res: express.Response, next) => {


    try {
        let cameraId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.cameraId)
        //todo get single camera logic

        let camera = await getCamera(cameraId)

        res.status(200).json({
            camera: camera
        })
    } catch (err) {
        next(err)

    }
}
)





cameraRouter.put('/camera/:cameraId', async (req: express.Request, res: express.Response, next) => {


    try {
        let cameraId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.cameraId)
        let cameraDetails: ICamera = req.body


        //todo updation logic

        let updatedCamera = await updateCamera(cameraId, cameraDetails)

        res.status(200).json({
            msg: 'camera updated successfully',
            updatedCamera: updatedCamera
        })
    }
    catch (err) {
        next(err)

    }
})



cameraRouter.delete('/camera/:cameraId', async (req: express.Request, res: express.Response, next) => {


    try {
        let cameraId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.cameraId)
        //todo deletion logic


        let removedCamera = await removeCamera(cameraId)


        res.status(200).json({
            msg: 'camera deleted successfully',
            removedCamera: removedCamera
        })
    }
    catch (err) {
        next(err)

    }
})


export default cameraRouter
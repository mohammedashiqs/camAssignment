import express from 'express'
import { body, validationResult } from 'express-validator'
import { ICamera } from '../camera/models/ICamera';
import Camera from '../camera/models/camera';
import { createCamera } from '../camera/services/cameraServices';
import { error } from 'console';



const cameraRouter: express.Router = express.Router();


cameraRouter.post('/camera', async (req: express.Request, res: express.Response, next) => {

        try {
            let camera:ICamera = req.body
            /*  todo registration logic */
            

           let createdCamera = await createCamera(camera)

            res.status(200).json({
                msg: 'camera created successfully',
                createdCamera: createdCamera
            })
        }
        catch(error) {
            
            
            next(error)

        }
    })



cameraRouter.get('/cameras', async (req: express.Request, res: express.Response) => {


    try {
        //todo get all cameras logic
        let camera: ICamera[] | null = await Camera.find()
        if (!camera) {
            res.status(400).json({
                errors: [
                    {
                        msg: 'No events found'
                    }
                ]
            })
        }


        res.status(200).json({
            camera: camera
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            errors: [
                {
                    msg: err
                }
            ]
        })

    }
})


cameraRouter.get('/camera/:cameraId', [
], async (req: express.Request, res: express.Response) => {


    try {
        let { cameraId } = req.params
        //todo get single camera logic
        let camera: ICamera | null = await Camera.findById(cameraId)
        if (!camera) {
            res.status(400).json({
                errors: [
                    {
                        msg: 'No camera found'
                    }
                ]
            })
        }


        res.status(200).json({
            camera: camera
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            errors: [
                {
                    msg: err
                }
            ]
        })

    }
})



cameraRouter.put('/camera/:cameraId', [
], async (req: express.Request, res: express.Response) => {


    try {
        let cameraId: string = req.params.cameraId
        let cameraDetails: ICamera = req.body
        console.log(cameraId);
        console.log(cameraDetails);


        //todo updation logic
        let updatedCamera = await Camera.findByIdAndUpdate(cameraId, cameraDetails, { new: true })
        if (!updatedCamera) {
            return res.status(400).json({
                erros: [
                    {
                        msg: "No camera found"
                    }
                ]
            })
        }


        res.status(200).json({
            msg: 'camera updated (using put) successfully',
            updatedCamera: updatedCamera
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            errors: [
                {
                    msg: err
                }
            ]
        })

    }
})



cameraRouter.delete('/camera/:cameraId', [
], async (req: express.Request, res: express.Response) => {


    try {
        let cameraId: string = req.params.cameraId
        //todo deletion logic


        let removedCamera = await Camera.findByIdAndRemove(cameraId)
        if (!removedCamera) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "No camera found"
                    }
                ]
            })
        }


        res.status(200).json({
            msg: 'camera deleted successfully',
            removedCamera: removedCamera
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            errors: [
                {
                    msg: err
                }
            ]
        })

    }
})


export default cameraRouter
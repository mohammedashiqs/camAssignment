import express from 'express'
import { body, validationResult } from 'express-validator'
import { ICamera } from '../../models/ICamera';
import Camera from '../../models/camera';
import { ObjectId } from 'mongoose';


const cameraRouter : express.Router = express.Router();


cameraRouter.post('/camera', /* [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('url').not().isEmpty().withMessage('url is required'),
], */ async (req: express.Request, res: express.Response) => {

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    
    try {
        let {name, description, url} = req.body
        //todo registration logic

        //check if the camera is exists
        let camera: ICamera | null = await Camera.findOne({ name: name })
        if (camera) {
            return res.status(400).json({
                errors: [
                    { msg: 'camera is Already exists' }
                ]
            })
        }
        
        //register the camera 
        camera = new Camera({ name, description, url})
        camera = await camera.save()
        
        res.status(200).json({
            msg: 'camera created successfully'
        })
    }   
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: [
                {
                    msg: err
                }
            ]
        })

    }
})



cameraRouter.get('/cameras', [
], async (req: express.Request, res: express.Response) => {

    
    try {
        //todo get all cameras logic
        let camera:ICamera[] | null  = await Camera.find()
        if(!camera){
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
            error: [
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
        let {cameraId} = req.params
        //todo get single camera logic
        let camera:ICamera | null  = await Camera.findById(cameraId)
        if(!camera){
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
            error: [
                {
                    msg: err
                }
            ]
        })

    }
})

/* updation using put */
cameraRouter.put('/camera/:cameraId', [
], async (req: express.Request, res: express.Response) => {

    
    try {
        let cameraId:string = req.params.cameraId
        let cameraDetails:ICamera = req.body
        console.log(cameraId);
        console.log(cameraDetails);
        
        
        //todo updation logic
        let updatedCamera = await Camera.findByIdAndUpdate(cameraId, cameraDetails, { new: true})
        if(!updatedCamera){
            return res.status(400).json({
               erros: [
                {
                    msg:"No camera found"
                }
                ]
            })
        }
             
             
             // let camera = Camera.findOne({_id: cameraId})

        
        res.status(200).json({
            msg: 'camera updated (using put) successfully',
            updatedCamera: updatedCamera
        })
    }   
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: [
                {
                    msg: err
                }
            ]
        })

    }
})


/* updation using patch */
cameraRouter.patch('/camera/:cameraId', [
], async (req: express.Request, res: express.Response) => {

    
    try {
        let {cameraId} = req.params
        //todo updation logic

        
        res.status(200).json({
            msg: 'camera updated (using patch) successfully'
        })
    }   
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: [
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
        let cameraId:string = req.params.cameraId
        //todo deletion logic
        
       
           let removedCamera = await Camera.findByIdAndRemove(cameraId)
           if(!removedCamera){
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
            error: [
                {
                    msg: err
                }
            ]
        })

    }
})


export default cameraRouter
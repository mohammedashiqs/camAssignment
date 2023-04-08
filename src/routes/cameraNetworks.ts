import express from 'express'
import { ICameraNetwork } from '../cameraNetwork/models/ICameraNetwork';
import CameraNetwork from '../cameraNetwork/models/cameraNetwork';


const cameraNetworksRouter: express.Router = express.Router();



cameraNetworksRouter.post('/cameraNetwork', (req: express.Request, res: express.Response) => {

    try {

        /*  todo registraion logic */

        //check if the cameranetwork exists

        //register the cameranetwork
        

        res.status(200).json({
            msg: "cameranetwork created successfully"
        })

    } catch (err) {

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

export default cameraNetworksRouter



cameraNetworksRouter.get('/cameraNetwork', (req: express.Request, res: express.Response) => {


    res.status(500).json({
        msg: "get all the cameraNetworks"
    })

})



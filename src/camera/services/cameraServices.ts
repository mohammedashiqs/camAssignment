import { ICamera } from "../models/ICamera"
import Camera from "../models/camera"




export const createCamera = async (camera: ICamera) => {


try{

 //check if the camera is exists

 let isCameraExist = await Camera.findOne({ name: camera.name })
            /* if (isCameraExist) {
                return res.status(400).json({
                    errors: [
                        { msg: 'camera is Already exists' }
                    ]
                })
            } */


 //register the camera 
 camera = new Camera(camera)
 camera = await camera.save()
 return camera

}catch(err){

    console.log(err);
    
}


}



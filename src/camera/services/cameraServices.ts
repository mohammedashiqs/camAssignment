import { ICamera } from "../models/ICamera"
import Camera from "../models/camera"
import { CustomError } from "../../../commen/custumError"



export const createCamera = async (camera: ICamera) => {


try{

 //check if the camera is exists

 let isCameraExist = await Camera.findOne({ name: camera.name })
            if (isCameraExist) {
                throw new CustomError(
                    "camera is Already exists",
                    400,
                    "Please change the Name of Camera"
                  );
            }

            
 //register the camera 
 camera = new Camera(camera)
 camera = await camera.save()

 return camera

}catch(error){
    throw error ;
}


}



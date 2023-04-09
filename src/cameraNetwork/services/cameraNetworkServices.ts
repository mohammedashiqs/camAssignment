import { CustomError } from "../../../commen/custumError"
import { ICameraNetwork } from "../models/ICameraNetwork"
import CameraNetwork from "../models/cameraNetwork"






export const createCameraNetwork = async (cameraNetworkDetails: ICameraNetwork) => {
    try {
        //check if the cameranetwork exists

        let cameraNetwork = await CameraNetwork.findOne({ name: cameraNetworkDetails.name })
        if(cameraNetwork){
            throw new CustomError(
                "CameraNetwork already exists",
                400,
                "Please change the name"
            )
        }

        //register the cameranetwork

        cameraNetwork = new CameraNetwork(cameraNetworkDetails)
        let createdCameraNetwork  =  cameraNetwork.save()

        return createdCameraNetwork
    } catch (error) {
        throw error
    }
}
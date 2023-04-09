import { ICamera } from "../models/ICamera"
import Camera from "../models/camera"
import { CustomError } from "../../../commen/custumError"
import mongoose from "mongoose"



export const createCamera = async (cameraDetails: ICamera) => {


    try {

        //check if the camera is exists

        let isCameraExist = await Camera.findOne({ name: cameraDetails.name })
        if (isCameraExist) {
            throw new CustomError(
                "camera is Already exists",
                400,
                "Please change the Name of Camera"
            );
        }


        //register the camera 
        cameraDetails = new Camera(cameraDetails)
       let createdCamera = await cameraDetails.save()

        return createdCamera

    } catch (error) {
        throw error;
    }

}


export const getAllCameras = async () => {

    try {

        let camera: ICamera[] | null = await Camera.find()
        if (!camera) {

            throw new CustomError(
                "No Cameras found",
                400,
                ""

            )
        }

        return camera

    } catch (error) {
        throw error
    }

}


export const getCamera = async (cameraId: mongoose.Types.ObjectId) => {
    try {
        let camera: ICamera | null = await Camera.findById(cameraId)
        if (!camera) {
            throw new CustomError(
                "Camera not found",
                400,
                ""
            )
        }
        return camera

    } catch (err) {
        throw err
    }
}


export const updateCamera = async (cameraId: mongoose.Types.ObjectId, cameraDetails:ICamera) => {

    try {

        let updatedCamera = await Camera.findByIdAndUpdate(cameraId, cameraDetails, { new: true })
        if (!updatedCamera) {
            throw new CustomError(
                "Camera not found",
                400,
                ""
            )
        }

        return updatedCamera

    } catch (err) {
        throw err
    }

}


export const removeCamera = async (cameraId: mongoose.Types.ObjectId) => {
    try{

        let removedCamera = await Camera.findByIdAndRemove(cameraId)
        if (!removedCamera) {
            throw new CustomError(
                "Camera not found",
                400,
                ""
            )
        }

        return removedCamera

    }catch(err){
        throw err
    }
}


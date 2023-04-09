import mongoose from "mongoose"
import { CustomError } from "../../../commen/custumError"
import { ICameraNetwork } from "../models/ICameraNetwork"
import CameraNetwork from "../models/cameraNetwork"






export const createCameraNetwork = async (cameraNetworkDetails: ICameraNetwork) => {
    try {
        //check if the cameranetwork exists

        let cameraNetwork = await CameraNetwork.findOne({ name: cameraNetworkDetails.name })
        if (cameraNetwork) {
            throw new CustomError(
                "CameraNetwork already exists",
                400,
                "Please change the name"
            )
        }

        //register the cameranetwork

        cameraNetwork = new CameraNetwork(cameraNetworkDetails)
        let createdCameraNetwork = cameraNetwork.save()

        return createdCameraNetwork
    } catch (error) {
        throw error
    }
}



export const getAllCameraNetworks = async () => {
    try {

        const aggregate = CameraNetwork.aggregate()
        aggregate.facet({

            cameraNetworks: [

                {
                    $project: {
                        name: 1,
                        description: 1,
                        cameras: 1
                    }
                },
                { $sort: { name: 1 } },
                { $skip: 0 },
                { $limit: 30 }

            ]
        })

        const response = await aggregate.exec()
        return response

    } catch (err) {
        throw err
    }
}


export const updateCameraNetwork = async (cameraNetworkId: mongoose.Types.ObjectId, cameraNetworkDetails: ICameraNetwork) => {

    try {

        let updatedCameraNetwork = await CameraNetwork.findByIdAndUpdate(cameraNetworkId, cameraNetworkDetails,
            { new: true })

        return updatedCameraNetwork

    } catch (error) {
        throw error
    }



}


export const addCameraToCameraNetwork = async (cameraNetworkId: mongoose.Types.ObjectId, cameras: object[]) => {
console.log(cameras);

    try {
        //remove all cameras inside this cameraNetwork
        await CameraNetwork.updateOne({ _id: cameraNetworkId }, {
            $pull: {cameras:{}}
        })


        /* ToDo Insert cameras to cameraNetwork's array logic */

        const camerasToBeInstert = await cameras.map((camera: any) => {
            const cameraId = new mongoose.Types.ObjectId(camera.cameraId)
            return { cameraId: cameraId }
        })

        let updatedCameraNetwork = await CameraNetwork.updateOne({ _id: cameraNetworkId }, {
            $push: { cameras: { $each: camerasToBeInstert } }
        })


        return updatedCameraNetwork

    } catch (error) {
        throw error
    }
}



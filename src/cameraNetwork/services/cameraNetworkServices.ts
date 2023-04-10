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
            $pull: { cameras: {} }
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


export const removeCameraNetwork = async (cameraNetworkId: mongoose.Types.ObjectId) => {
    try {
        let removedCameraNetwork = await CameraNetwork.findByIdAndDelete(cameraNetworkId)
        if (!removedCameraNetwork) {
            throw new CustomError(
                "CameraNetwork not found",
                400,
                ""
            )
        }

        return removedCameraNetwork

    } catch (error) {
        throw error
    }
}


export const getCameraNetwork = async (cameraNetworkId: mongoose.Types.ObjectId) => {

    try {

        const aggregate = CameraNetwork.aggregate()
        aggregate.match({ _id: cameraNetworkId })
        aggregate.facet({


            cameraNetwork: [
                {
                    $project:{
                        name:1,
                        description:1,
                        cameras: {$ifNull: ["$cameras", [] ]}
                    }
                },
                {
                    $unwind: {
                        path: "$cameras",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup:{
                        from:"cameras",
                        localField: "cameras.cameraId",
                        foreignField: "_id",
                        as: "cameras.cameraId"

                    }
                },
                {
                    $unwind: "$cameras.cameraId"
                },
                {
                    $group:{
                        _id: "$_id",
                        name: {$first: "$name"},
                        description: {$first: "$description"},
                        cameras: {$push: "$cameras"}
                    }
                }
                
            ]


        })

        const cameraNetworkDetails = await aggregate.exec()

        return { ...cameraNetworkDetails[0].cameraNetwork[0] }

    } catch (error) {
        throw error
    }


}
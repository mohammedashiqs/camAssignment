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



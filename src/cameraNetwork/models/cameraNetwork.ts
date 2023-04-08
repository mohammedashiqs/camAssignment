import mongoose, {Schema, Model} from "mongoose";
import {ICameraNetwork} from './ICameraNetwork'


let cameraNetworkSchema: Schema = new mongoose.Schema({

    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    cameras: {type: Array, default: []}

}, {timestamps:true});

let CameraNetwork:Model<ICameraNetwork> = mongoose.model<ICameraNetwork>('CameraNetwork', cameraNetworkSchema)
export default CameraNetwork
import mongoose, {Schema, Model} from "mongoose";
import {ICamera} from './ICamera'


let cameraSchema: Schema = new mongoose.Schema({

    name: {type: String, required: true, unique: true},
    description: {type: String, default:null},
    url: {type: String, default:null}

}, {timestamps:true});

let Camera:Model<ICamera> = mongoose.model<ICamera>('Camera', cameraSchema)
export default Camera
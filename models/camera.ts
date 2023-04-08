import mongoose, {Schema, Model} from "mongoose";
import {ICamera} from './ICamera'


let cameraSchema: Schema = new mongoose.Schema({

    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    url: {type: String, required: true}

}, {timestamps:true});

let Camera:Model<ICamera> = mongoose.model<ICamera>('Camera', cameraSchema)
export default Camera
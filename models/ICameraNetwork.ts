import mongoose, {Document} from 'mongoose'

export interface ICameraNetwork extends Document {
    _id?: string,
    name: string,
    description: string,
    cameras: Array<{}>,          
    createdAt?: string,
    updatedAt?: string
}

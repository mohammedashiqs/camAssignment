import mongoose, {Document} from 'mongoose'

export interface ICamera extends Document {
    _id?: string,
    name: string,
    description: string,
    url: string,
    createdAt?: string,
    updatedAt?: string
}

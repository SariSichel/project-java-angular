import User from "./user.model"

export default class Comment{
    id!:Number
    text?:string
    rating?:Number
    updateDate!:Date
    userName!:User
}
import User from "./user.model"

export default class Comments{
    id!:Number
    text?:string
    rating?:number
    updateDate!:Date
    user!:User
    postId!:Number
}
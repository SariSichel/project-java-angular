import User from "./user.model"

export default class Comments{
    id!:Number
    text?:string
    rating?:Number
    updateDate!:Date
    userName!:User
    postId!:Number
}
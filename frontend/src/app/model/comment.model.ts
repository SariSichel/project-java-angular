import User from "./user.model"

export default class Comment{
    id!:Number
    text?:Text
    rating?:Number
    updateDate!:Date
    userName!:User
}
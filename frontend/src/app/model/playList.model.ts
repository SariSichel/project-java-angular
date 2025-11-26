import Post from "./post.model"
import User from "./user.model"

export default class PlayList{
    id!:number
    name!:string
    creationDate!:Date
    lastUpdated!:Date
    user!:User
}


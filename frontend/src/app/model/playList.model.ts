import Post from "./post.model"

export default class PlayList{
    id!:Number
    name!:string
    creationDate!:Date
    lastUpdated!:Date
    posts!:Post[]
}

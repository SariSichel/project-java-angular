import Post from "./post.model"

export default class PlayList{
    id!:number
    name!:string
    creationDate!:Date
    lastUpdated!:Date
    posts!:Post[]
}

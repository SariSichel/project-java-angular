import CategoryName from "./category.model"
import User from "./user.model"
import Comment from "./comment.model"

export default class Post{
    
    id !:Number
    name !: string
    description ?:string
    lyrics?: string
    audioPath!: string
    uploadDate!: Date
    updateDate?:Date
    photoPath?:string
    user!:User
    category!:CategoryName
    usersTookPart!:string
    comments!:Comment[]

}
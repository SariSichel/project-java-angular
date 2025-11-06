import CategoryName from "./category.model"
import User from "./user.model"
import Comment from "./comment.model"

export default class Post{
    id !:Number
    name !: string
    description ?:string
    lyrics?: string
    //איך מביאים את האודיו לכאן
    //צריך גם את הניתוב?
    audio!: string
    uploadDate!: Date
    updateDate?:Date
    //אותן שאלות על התמונה
    photoPath?:string
    user!:User
    category!:CategoryName
    // לבדוק אם לשנות את זה לסטרינג
    usersTookPart!:string
    comments!:Comment[]

}
// import CategoryName from "./category.model"
// import User from "./user.model"
// import Comment from "./comments.model"
// import comments from "./comments.model"
// import Comments from "./comments.model"

// export default class Post{
    
//     id !:number
//     name !: string
//     description ?:string
//     lyrics?: string
//     audioPath!: string
//     uploadDate!: Date
//     updateDate?:Date
//     photoPath?:string
//     user!:User
//     category!:CategoryName
//     usersTookPart!:string
//     comments!:Comments[]
//     avarageRating?:number

// }
import CategoryName from "./category.model"
import User from "./user.model"
import Comments from "./comments.model"

export default class Post {
    
    id!: number
    name!: string
    description?: string
    lyrics?: string
    audioPath!: string
    uploadDate!: Date
    updateDate?: Date
    photoPath?: string
    user!: User
    category!: CategoryName
    usersTookPart!: string
    comments!: Comments[]
    averageRating?: number // ⭐ הוסף את זה - דירוג ממוצע
}
// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-add-comment',
//   imports: [FormsModule],
//   templateUrl: './add-comment.component.html',
//   styleUrl: './add-comment.component.css'
// })
// export class AddCommentComponent {

//   public newComment: Comment = {
//     id:-1,                    // יקבל ערך בשרת או באופן מקומי
//     text: "",
//     rating: undefined,
//     updateDate: new Date(),
//     //צריך לתפוס יוזר מהלוקאל סטוראג
//     userName: {               // כאן תצטרך להזין את המשתמש הנוכחי (לדוגמה מה-service)
//       id: 1,
//       name: 'משתמש לדוגמה',
//       mail: 'user@example.com',
//       photoPath: "לקחת את התמונה של המשתמש הנוכחי"
//     } 
//   };

//   // אם אתה רוצה לשלוח את הקומנט החוצה להורה
//   @Output() commentAdded = new EventEmitter<Comment>();

//   // הפונקציה שמופעלת בלחיצה על הכפתור
//   addComment(form: NgForm): void {
//     // בדיקה שהטופס תקין
//     if (form.invalid) {
//       // מסמן את כל השדות כ-nouched כדי שההודעות שגיאה יופיעו
//       form.form.markAllAsTouched();
//       return;
//     }

//     // יצירת אובייקט חדש נקי (אפשר גם לשכפל את newComment)
//     const commentToAdd: Comment = {
//       ...this.newComment,
//       updateDate: new Date(),
//       // אם אתה רוצה id אוטומטי מקומי (לדוגמה):
//       // id: Date.now()
//     };

//     // שולחים את הקומנט להורה דרך EventEmitter
//     this.commentAdded.emit(commentToAdd);

//     // מאפסים את הטופס
//     this.resetForm(form);
//   }

//   // איפוס הטופס והמודל
//   private resetForm(form: NgForm): void {
//     form.resetForm();
//     this.newComment = {
//       id: 0,
//       text: '',
//       rating: undefined,
//       updateDate: new Date(),
//       userName: this.newComment.userName // שומר את המשתמש הנוכחי
//     };
//   }

// }

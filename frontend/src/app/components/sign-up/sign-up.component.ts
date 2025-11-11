import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../model/userSignUp.model';
import UserSignUp from '../../model/userSignUp.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

    public selectedPhoto: File | null = null;

//יש לעשות בנאים 
constructor(private _userService:UserService){}


    public newUserSignUp: UserSignUp={
      name:"",
      photoPath:"",
      mail:"",
      password:""
    }

    onFileSelected(event: any, type: 'photo') {
    const file = event.target.files[0];
    this.selectedPhoto = file;
    }

  signUp() {
   if (!this.selectedPhoto) {
      alert("Please select photo");
      return;
    }
    const formData = new FormData();

    formData.append("photo", this.selectedPhoto);

    formData.append("userSignUp", new Blob
      ([JSON.stringify({name:this.newUserSignUp.name,
                        mail:this.newUserSignUp.mail,
                        photoPath:this.newUserSignUp.photoPath,
                        password:this.newUserSignUp.password})], { type: 'application/json' }));
    
    // שליחה לשרת
  this._userService.signUp(formData).subscribe({
      next: (res) => {
        alert("User signed up successfully!");
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to sign up");
      }
    });}

}

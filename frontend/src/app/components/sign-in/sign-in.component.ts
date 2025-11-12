import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import UserSignIn from '../../model/userSignIn.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private _userService:UserService, private router:Router){}

    public newUser:UserSignIn={
    name:"",
    password:"",
  }

  public notFound:boolean=false;

  //פונקציה מועתקת יש להתאים אותה
    signIn()
    {
    this._userService.signIn(this.newUser).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['home'])
      },
      error: (err) => {
        this.notFound=true;
        console.log(err)
      }
    })
  }

}

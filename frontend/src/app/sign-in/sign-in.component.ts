import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import UserSignIn from '../model/userSignIn.model';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

    public newUser:UserSignIn={
    name:"user name",
    password:"user password",
  }

  public notFound:boolean=false;

  //פונקציה מועתקת יש להתאים אותה
  //   signIn()
  //   {
  //   this._userService.logIn(this.newUser).subscribe({
  //     next: (res) => {
  //     localStorage.setItem("currentUser", JSON.stringify(res))
  //       console.log(res)
  //       this.router.navigate(['home'])
  //     },
  //     error: (err) => {
  //       this.notFound=true;
  //       console.log(err)
  //     }
  //   })
  // }

}

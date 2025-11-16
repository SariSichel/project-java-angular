import { Component } from '@angular/core';
import User from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-personal-area',
  imports: [FormsModule],
  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.css'
})
export class PersonalAreaComponent {

  constructor(private userService:UserService, private route:ActivatedRoute) { }

  public user!:User;
  public selectedPhoto: File | null = null;
ngOnInit():void{
  var id:Number;
  this.route.params.subscribe((params)=>{
    id=params['id'];
    this.userService.getUserByIdFromServer(id).subscribe({
      next:(res)=>{
        this.user=res;
      },
      error:(err)=>{
        console.error('Error fetching user:', err);
      }
    });
  });
  }

  public userToChange:User={
    id:this.user.id,
    name:this.user.name,
    mail:this.user.mail,
    photoPath:this.user.photoPath
  }

onPhotoSelected(event:any, type: 'photo'):void{
  this.selectedPhoto = event.target.files[0];
}
updateUser(){
  const formData = new FormData();
  formData.append('photo', this.selectedPhoto!);
  const userBlob=new Blob([JSON.stringify({
    id:this.userToChange.id,
    name:this.userToChange.name,
    mail:this.userToChange.mail,
    photoPath:this.userToChange.photoPath
  })], {type:'application/json'});
  formData.append('userUpdate',userBlob); 
// לעשות בשרת פונקציית PUT
  // this.userService.updateUserOnServer(formData).subscribe({
  //   next:(res)=>{
  //     alert("User updated successfully!");
  //   },
  //   error:(err)=>{
  //     console.error(err);
  //     alert("Failed to update user");
  //   }
  // });
}

}

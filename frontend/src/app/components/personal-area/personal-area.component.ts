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

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  public user!: User;  // רק משתנה אחד!
  public selectedPhoto: File | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userService.getUserByIdFromServer(id).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
    });
  }

  onPhotoSelected(event: any): void {
    this.selectedPhoto = event.target.files[0];
  }

  updateUser() {
    const formData = new FormData();
    
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    const userBlob = new Blob([JSON.stringify({
      id: this.user.id,           
      name: this.user.name,
      mail: this.user.mail,
      photoPath: this.user.photoPath
    })], { type: 'application/json' });
    
    formData.append('userUpdate', userBlob); 

    this.userService.updateUser(formData).subscribe({
      next: (res) => {
        alert("The user updated successfully!");
      },
      error: (err) => {
        // בדוק אם הסטטוס הוא 200 למרות השגיאה
      
      }
    });
  }
}
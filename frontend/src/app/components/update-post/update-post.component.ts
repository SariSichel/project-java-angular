import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Post from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import Category from '../../model/category.model';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-update-post',
  imports: [FormsModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})

export class UpdatePostComponent{

  constructor(private categoryService: CategoriesService, private postService: PostsService,private route: ActivatedRoute) { }

  public post!: Post; 
  public audioUrl: string | null = null;
  public selectedPhoto: File | null = null;
  public selectedAudio: File | null = null;
  public categoriesList:Category[]=[]

  ngOnInit(): void {

     this.categoryService.getCategoriesFromServer().subscribe({
      next: (res)=>{
        this.categoriesList=res
      },
      error: (err)=>{
      }
    })
  
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.postService.getPostByIdFromServer(id).subscribe({
        next: (res) => {
          this.post = res;

          this.postService.getAudio(this.post.audioPath).subscribe({
          next: (audioBlob) => {
                this.audioUrl = URL.createObjectURL(audioBlob);  
          },
          error: (err) => {
            // טיפול בשגיאת קבלת האודיו
            console.error('Error fetching audio:', err); 
          }
           });
        },

        error: (err) => {
          console.error('Error fetching post:', err);
        }
      });
    });
  }

  onPhotoSelected(event: any): void {
    this.selectedPhoto = event.target.files[0];
  }

  //המלצה מהגמיני
//   onPhotoSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     this.selectedPhoto = input.files[0];
//   }
// }

  onAudioSelected(event: any): void {
    this.selectedAudio = event.target.files[0];
  }

  updatePost() {
    const formData = new FormData();

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    if (this.selectedAudio) {
      formData.append('audio', this.selectedAudio);
    }

    const postBlob = new Blob([JSON.stringify({
      id: this.post.id,          
      name: this.post.name,
      description: this.post.description,
      lyrics: this.post.lyrics,
      category: this.post.category,
      usersTookPart: this.post.usersTookPart,
      photoPath: this.post.photoPath,
      audioPath: this.post.audioPath,
      uploadDate: this.post.uploadDate,
      updateDate: new Date()
    })], { type: 'application/json' });

    formData.append('post', postBlob);

    this.postService.updatePost(formData).subscribe({
      next: (res) => {
        alert("the poster updated successfully!");
      },
      error: (err) => {
       console.error('Update failed:', err);
       alert('Failed to update post');      }
    });
  }

  ngOnDestroy(): void {
  if (this.audioUrl) {
    URL.revokeObjectURL(this.audioUrl);
  }
}

}
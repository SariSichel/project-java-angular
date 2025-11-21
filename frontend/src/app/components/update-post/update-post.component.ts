import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Category from '../../model/category.model';
import { PostsService } from '../../services/posts.service';
import { CategoriesService } from '../../services/categories.service';
import Post from '../../model/post.model';


@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit{

  postForm: FormGroup;
  postId!: number;
  public categoriesList!: Category[];
  isLoading = true;

  // קבצים חדשים (אם המשתמש רוצה להחליף)
  selectedPhoto: File | null = null;
  selectedAudio: File | null = null;

  // תצוגה מקדימה
  photoPreview?: string;
  audioFileName?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _postService: PostsService,
    private _categoryService: CategoriesService
  ) {
    this.postForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      lyrics: [''],
      categoryId: ['', Validators.required],
      usersTookPart: ['']
    });
  }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;

    Promise.all([
      this.loadCategories(),
      this.loadPost()
    ]).finally(() => this.isLoading = false);
  }

  private loadCategories(): Promise<void> {
    return this._categoryService.getCategoriesFromServer().toPromise().then(cats => {
      this.categoriesList = cats;
    });
  }

  private loadPost(): void {
    this._postService.getPostByIdFromServer(this.postId).subscribe({
      next: (post: Post) => {
        this.postForm.patchValue({
          name: post.name,
          description: post.description || '',
          lyrics: post.lyrics || '',
          categoryId: post.category.id,
          usersTookPart: post.usersTookPart || ''
        });

        this.photoPreview = post.photoPath;
        this.audioFileName = this.extractFileName(post.audioPath);
      },
      error: () => {
        alert('לא נמצא הפוסט');
        this.router.navigate(['/posts']);
      }
    });
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
      const reader = new FileReader();
      reader.onload = e => this.photoPreview = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  onAudioSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      this.selectedAudio = file;
      this.audioFileName = file.name;
    } else {
      alert('אנא בחר קובץ אודיו תקין');
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.postForm.get('name')?.value);
    formData.append('description', this.postForm.get('description')?.value || '');
    formData.append('lyrics', this.postForm.get('lyrics')?.value || '');
    formData.append('categoryId', this.postForm.get('categoryId')?.value);
    formData.append('usersTookPart', this.postForm.get('usersTookPart')?.value || '');

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }
    if (this.selectedAudio) {
      formData.append('audio', this.selectedAudio);
    }

    this._postService.update(this.postId, formData).subscribe({
      next: () => {
        alert('הפוסט עודכן בהצלחה!');
        this.router.navigate(['full-post', this.postId]);
      },
      error: (err) => {
        console.error(err);
        alert('שגיאה בעדכון הפוסט');
      }
    });
  }

  private extractFileName(path: string): string {
    return path.split('/').pop() || path;
  }

  cancel(): void {
    this.router.navigate(['full-post', this.postId]);
  }
}
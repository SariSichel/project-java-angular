// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import Category from '../../model/category.model';
// import { PostsService } from '../../services/posts.service';
// import { CategoriesService } from '../../services/categories.service';
// import Post from '../../model/post.model';


// @Component({
//   selector: 'app-update-post',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './update-post.component.html',
//   styleUrl: './update-post.component.css'
// })
// export class UpdatePostComponent implements OnInit{

//   postForm: FormGroup;
//   postId!: number;
//   public categoriesList!: Category[];
//   isLoading = true;

//   // קבצים חדשים (אם המשתמש רוצה להחליף)
//   selectedPhoto: File | null = null;
//   selectedAudio: File | null = null;

//   // תצוגה מקדימה
//   photoPreview?: string;
//   audioFileName?: string;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private _postService: PostsService,
//     private _categoryService: CategoriesService
//   ) {
//     this.postForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2)]],
//       description: [''],
//       lyrics: [''],
//       categoryId: ['', Validators.required],
//       usersTookPart: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.postId = +this.route.snapshot.paramMap.get('id')!;

//     Promise.all([
//       this.loadCategories(),
//       this.loadPost()
//     ]).finally(() => this.isLoading = false);
//   }

//   private loadCategories(): Promise<void> {
//     return this._categoryService.getCategoriesFromServer().toPromise().then(cats => {
//       this.categoriesList = cats;
//     });
//   }

//   private loadPost(): void {
//     this._postService.getPostByIdFromServer(this.postId).subscribe({
//       next: (post: Post) => {
//         this.postForm.patchValue({
//           name: post.name,
//           description: post.description || '',
//           lyrics: post.lyrics || '',
//           categoryId: post.category.id,
//           usersTookPart: post.usersTookPart || ''
//         });

//         this.photoPreview = post.photoPath;
//         this.audioFileName = this.extractFileName(post.audioPath);
//       },
//       error: () => {
//         alert('לא נמצא הפוסט');
//         this.router.navigate(['/posts']);
//       }
//     });
//   }

//   onPhotoSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedPhoto = file;
//       const reader = new FileReader();
//       reader.onload = e => this.photoPreview = e.target?.result as string;
//       reader.readAsDataURL(file);
//     }
//   }

//   onAudioSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('audio/')) {
//       this.selectedAudio = file;
//       this.audioFileName = file.name;
//     } else {
//       alert('אנא בחר קובץ אודיו תקין');
//     }
//   }

//   onSubmit(): void {
//     if (this.postForm.invalid) {
//       this.postForm.markAllAsTouched();
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', this.postForm.get('name')?.value);
//     formData.append('description', this.postForm.get('description')?.value || '');
//     formData.append('lyrics', this.postForm.get('lyrics')?.value || '');
//     formData.append('categoryId', this.postForm.get('categoryId')?.value);
//     formData.append('usersTookPart', this.postForm.get('usersTookPart')?.value || '');

//     if (this.selectedPhoto) {
//       formData.append('photo', this.selectedPhoto);
//     }
//     if (this.selectedAudio) {
//       formData.append('audio', this.selectedAudio);
//     }

//     this._postService.update(this.postId, formData).subscribe({
//       next: () => {
//         alert('הפוסט עודכן בהצלחה!');
//         this.router.navigate(['full-post', this.postId]);
//       },
//       error: (err) => {
//         console.error(err);
//         alert('שגיאה בעדכון הפוסט');
//       }
//     });
//   }

//   private extractFileName(path: string): string {
//     return path.split('/').pop() || path;
//   }

//   cancel(): void {
//     this.router.navigate(['full-post', this.postId]);
//   }
// }


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
export class UpdatePostComponent implements OnInit {

  postForm: FormGroup;
  postId!: number;
  public categoriesList!: Category[];
  isLoading = true;

  selectedPhoto: File | null = null;
  selectedAudio: File | null = null;

  photoPreview?: string;
  audioFileName?: string;

  private originalPost!: Post;

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
    // 🔍 DEBUG 1: בדיקת Cookies בטעינת הקומפוננטה
    console.log('=== DEBUG: Component Init ===');
    console.log('All cookies:', document.cookie);
    console.log('Cookie length:', document.cookie.length);
    this.analyzeCookies();

    this.postId = +this.route.snapshot.paramMap.get('id')!;

    Promise.all([
      this.loadCategories(),
      this.loadPost()
    ]).finally(() => this.isLoading = false);
  }

  // 🔍 פונקציה לניתוח Cookies
  private analyzeCookies(): void {
    const cookies = document.cookie.split(';');
    console.log('=== Cookie Analysis ===');
    console.log('Number of cookies:', cookies.length);
    
    cookies.forEach((cookie, index) => {
      const [name, ...valueParts] = cookie.split('=');
      const value = valueParts.join('=');
      console.log(`Cookie ${index + 1}: ${name.trim()}`);
      console.log(`  Length: ${value.length} characters`);
      if (value.length > 100) {
        console.log(`  ⚠️ Large cookie! First 100 chars: ${value.substring(0, 100)}...`);
      }
    });
    
    const totalLength = document.cookie.length;
    if (totalLength > 4096) {
      console.error('🚨 PROBLEM: Total cookie size exceeds 4KB!', totalLength);
    } else {
      console.log('✅ Total cookie size OK:', totalLength);
    }
  }

  private loadCategories(): Promise<void> {
    return this._categoryService.getCategoriesFromServer().toPromise().then(cats => {
      this.categoriesList = cats;
    });
  }

  private loadPost(): void {
    console.log('=== Loading Post ===');
    this._postService.getPostByIdFromServer(this.postId).subscribe({
      next: (post: Post) => {
        console.log('✅ Post loaded successfully');
        console.log('Post data size (approx):', JSON.stringify(post).length, 'characters');
        
        this.originalPost = post;
        
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
      error: (err) => {
        console.error('❌ Error loading post:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        alert('לא נמצא הפוסט');
        this.router.navigate(['/posts']);
      }
    });
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('📷 Photo selected:', file.name, 'Size:', file.size, 'bytes');
      this.selectedPhoto = file;
      const reader = new FileReader();
      reader.onload = e => this.photoPreview = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  onAudioSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      console.log('🎵 Audio selected:', file.name, 'Size:', file.size, 'bytes');
      this.selectedAudio = file;
      this.audioFileName = file.name;
    } else {
      alert('אנא בחר קובץ אודיו תקין');
    }
  }

  onSubmit(): void {
    console.log('=== Starting Submit ===');
    
    if (this.postForm.invalid) {
      console.warn('⚠️ Form is invalid');
      this.postForm.markAllAsTouched();
      return;
    }

    // 🔍 DEBUG 2: בדיקת Cookies לפני שליחה
    console.log('=== Pre-Submit Cookie Check ===');
    console.log('Cookie length before submit:', document.cookie.length);
    this.analyzeCookies();

    const selectedCategoryId = this.postForm.get('categoryId')?.value;
    const selectedCategory = this.categoriesList.find(cat => cat.id == selectedCategoryId);

    if (!selectedCategory) {
      alert('קטגוריה לא נמצאה');
      return;
    }

    const postData = {
      name: this.postForm.get('name')?.value,
      description: this.postForm.get('description')?.value || '',
      lyrics: this.postForm.get('lyrics')?.value || '',
      usersTookPart: this.postForm.get('usersTookPart')?.value || '',
      category: selectedCategory,
      photoPath: this.originalPost.photoPath,
      audioPath: this.originalPost.audioPath,
      updateDate: new Date()
    };

    console.log('📦 Post data size:', JSON.stringify(postData).length, 'characters');

    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(postData)], { 
      type: 'application/json' 
    }));

    if (this.selectedPhoto) {
      console.log('📷 Appending photo to FormData');
      formData.append('photo', this.selectedPhoto);
    } else {
      console.log('📷 No photo selected, sending empty blob');
      formData.append('photo', new Blob(), 'empty.jpg');
    }

    if (this.selectedAudio) {
      console.log('🎵 Appending audio to FormData');
      formData.append('audio', this.selectedAudio);
    } else {
      console.log('🎵 No audio selected, sending empty blob');
      formData.append('audio', new Blob(), 'empty.mp3');
    }

    console.log('🚀 Sending update request...');

    this._postService.update(this.postId, formData).subscribe({
      next: () => {
        console.log('✅ Post updated successfully');
        alert('הפוסט עודכן בהצלחה!');
        this.router.navigate(['full-post', this.postId]);
      },
      error: (err) => {
        console.error('❌ Update failed');
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
        console.error('Error message:', err.message);
        console.error('Full error:', err);
        
        // 🔍 DEBUG 3: בדיקת Cookies אחרי שגיאה
        console.log('=== Post-Error Cookie Check ===');
        this.analyzeCookies();
        
        if (err.status === 431) {
          console.error('🚨 431 Error - Request Header Fields Too Large');
          console.error('This means the cookies are too large!');
          console.error('Total cookie size:', document.cookie.length);
        }
        
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
import { Component } from '@angular/core';
import { ResumeService } from '../_services/resume.service';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './app-resume-upload.component.html',
  styleUrls: ['./app-resume-upload.component.css']
})
export class ResumeUploadComponent {
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  errorMessage: string = '';

  constructor(private resumeService: ResumeService) { }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      // Проверяем, может ли пользователь загружать резюме
      if (!this.resumeService.canUploadResume()) {
        this.uploadError = true;
        this.errorMessage = "У вас нет прав для загрузки резюме.";
        return;
      }

      this.resumeService.uploadResume(this.selectedFile).subscribe(
        response => {
          console.log('Upload successful!', response);
          this.uploadSuccess = true;
          this.uploadError = false;
        },
        error => {
          console.error('Upload error:', error);
          this.uploadError = true;
          this.uploadSuccess = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Unknown error occurred during upload.';
          }
        }
      );
    } else {
      console.error('No file selected.');
      this.uploadError = true;
      this.errorMessage = 'Please select a file to upload.';
    }
  }
}

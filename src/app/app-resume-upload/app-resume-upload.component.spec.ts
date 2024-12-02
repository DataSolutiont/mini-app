import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeUploadComponent } from './app-resume-upload.component';

describe('AppResumeUploadComponent', () => {
  let component: ResumeUploadComponent;
  let fixture: ComponentFixture<ResumeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

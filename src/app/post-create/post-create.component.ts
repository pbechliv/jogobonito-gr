import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  postCreateForm = this.fb.group({
    title: ['', [Validators.required]],
    lead: ['', [Validators.required]],
    titlePhoto: ['', [Validators.required]],
    sections: this.fb.array([]),
  });

  sectionTypes = [
    { name: 'YouTube', value: 'youtube' },
    { name: 'Image', value: 'image' },
    { name: 'Paragraph', value: 'paragraph' },
  ];

  constructor(private fb: FormBuilder) {}

  addSection() {
    const section = this.fb.group({
      type: [''],
      value: [''],
    });

    this.sections.push(section);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  async onSubmit() {
    console.log(this.postCreateForm.value);
  }

  get sections() {
    return this.postCreateForm.get('sections') as FormArray;
  }

  get sectionControls() {
    return this.sections.controls as FormGroup[];
  }
}

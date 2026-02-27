import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';

/** Password: alphanumeric only, starts with a letter, min 8 chars */
function alphanumericPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) return null;
  const valid = /^[A-Za-z][A-Za-z0-9]{7,}$/.test(value);
  return valid ? null : { alphanumericPassword: true };
}

/** Date of Birth: must be born in 2006 or earlier */
function bornIn2006OrEarlierValidator(control: AbstractControl): ValidationErrors | null {
  const val: Date | null = control.value;
  if (!val) return null;
  return val.getFullYear() <= 2006 ? null : { tooYoung: true };
}

@Component({
  selector: 'app-summit',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
  ],
  templateUrl: './summit.html',
  styleUrl: './summit.css',
  encapsulation: ViewEncapsulation.None,
})
export class SummitComponent {
  isDarkMode = false;
  submitted = false;

  topicOptions = ['Web Dev', 'AI & ML', 'Mobile', 'Cloud', 'Cybersecurity', 'IoT', 'Blockchain'];
  selectedTopics: string[] = [];

  minLevel = 1;
  maxLevel = 5;

  formdata: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, alphanumericPasswordValidator]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl<Date | null>(null, [Validators.required, bornIn2006OrEarlierValidator]),
    preferredSessionTime: new FormControl(null, [Validators.required]),
    city: new FormControl(''),
    techLevel: new FormControl(1),
    shortBio: new FormControl(''),
  });

  // result values
  fullName = '';
  emailAddress = '';
  gender = '';
  city = '';
  techLevel = 1;
  shortBio = '';

  toggleDarkMode(event: any) {
    this.isDarkMode = event.checked;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleTopic(topic: string) {
    const idx = this.selectedTopics.indexOf(topic);
    if (idx >= 0) {
      this.selectedTopics.splice(idx, 1);
    } else {
      this.selectedTopics.push(topic);
    }
  }

  isSelected(topic: string): boolean {
    return this.selectedTopics.includes(topic);
  }

  onSubmit() {
    if (this.formdata.valid) {
      this.submitted = true;
      const d = this.formdata.value;
      this.fullName = d.fullName;
      this.emailAddress = d.emailAddress;
      this.gender = d.gender;
      this.city = d.city;
      this.techLevel = d.techLevel;
      this.shortBio = d.shortBio;
    } else {
      this.formdata.markAllAsTouched();
    }
  }
}

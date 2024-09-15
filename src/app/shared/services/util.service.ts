import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, PatternValidator } from '@angular/forms';
import { RegexPatterns, ValidationMessages } from '@app/utils/libraries/app-constant';

@Injectable({ providedIn: 'root' })
export class UtilService {

  getErrorForm() {
    return {
      name: ['', { required: true }],
      email: ['', { required: true, email: true }],
      password: ['', { required: true, minLength: 8 }],
      confirmPassword: ['', { required: true, minLength: 8 }]
    };
  }

  hasError<T>(field: any | T, form: FormGroup): boolean {
    const control = form.controls[field];
    return (control.touched || control.dirty) && !control.valid;
  }

  errorMessage(field: any, form: FormGroup): string {
    const control = form.controls[field];
    if (!control || !control.errors) return '';

    // Mapa de errores y sus mensajes correspondientes
    const errorMessages: { [key: string]: string } = {
      required: ValidationMessages.REQUIRED,
      minlength: `${ValidationMessages.MIN_LENGTH}`,
      maxlength: `${ValidationMessages.MAX_LENGTH}`,
      email: ValidationMessages.EMAIL,
    };

    // Encuentra el primer error y retorna el mensaje correspondiente
    for (const errorKey in control.errors) {
      if (errorMessages[errorKey]) {
        return errorMessages[errorKey];
      }
    }
    return '';
  }

}

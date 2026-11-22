import { Component, signal } from '@angular/core';
import { SignUpModel } from './sign-up.model';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { SignUpFields } from './sign-up.config';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-sign-up',
  styleUrl: './sign-up.scss',
  templateUrl: './sign-up.html',
})
export class SignUp {
  signUpModel = signal<SignUpModel>({ firstName: '', lastName: '', emailAddress: '' });
  signUpFields = SignUpFields;

  signUpForm = form(this.signUpModel, (path) => {
    required(path.firstName, { message: 'Enter your first name' });
    required(path.lastName, { message: 'Enter your last name' });
    required(path.emailAddress, { message: 'Enter your email address' });
    email(path.emailAddress, {
      message: 'Enter your email address in the correct format, like name@example.com',
    });
  });
}

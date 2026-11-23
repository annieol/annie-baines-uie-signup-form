import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
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
  private readonly injector = inject(Injector);
  private readonly successHeading = viewChild<ElementRef<HTMLHeadingElement>>('successHeading');

  signUpModel = signal<SignUpModel>({ firstName: '', lastName: '', emailAddress: '' });
  signUpFields = SignUpFields;

  hasSubmitted = signal(false);

  signUpForm = form(
    this.signUpModel,
    (path) => {
      required(path.firstName, { message: 'Enter your first name' });
      required(path.lastName, { message: 'Enter your last name' });
      required(path.emailAddress, { message: 'Enter your email address' });
      email(path.emailAddress, {
        message: 'Enter your email address in the correct format, like name@example.com',
      });
    },
    {
      submission: {
        action: async () => {
          this.hasSubmitted.set(true);
          afterNextRender(() => this.successHeading()?.nativeElement.focus(), {
            injector: this.injector,
          });
        },
        onInvalid: (field) => {
          const firstError = field().errorSummary()[0];
          firstError?.fieldTree().focusBoundControl();
        },
      },
    },
  );
}

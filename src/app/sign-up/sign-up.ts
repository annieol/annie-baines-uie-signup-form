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
import { firstValueFrom } from 'rxjs';
import { SignUpService } from '../services/sign-up.service';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-sign-up',
  styleUrl: './sign-up.scss',
  templateUrl: './sign-up.html',
})
export class SignUp {
  private readonly signUpService = inject(SignUpService);
  private readonly injector = inject(Injector);
  private readonly successHeading = viewChild<ElementRef<HTMLHeadingElement>>('successHeading');

  private signUpModel = signal<SignUpModel>({ firstName: '', lastName: '', emailAddress: '' });
  readonly signUpFields = SignUpFields;

  hasSubmitted = signal(false);
  submitError = signal(false);

  readonly signUpForm = form(
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
        action: async (form) => {
          this.submitError.set(false);
          try {
            await firstValueFrom(this.signUpService.signUp(form().value()));
          } catch {
            this.submitError.set(true);
            return;
          }
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

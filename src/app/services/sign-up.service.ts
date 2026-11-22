import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { SignUpModel } from '../sign-up/sign-up.model';
import { SIGN_UP_URL } from '../../mocks/handlers';

@Service()
export class SignUpService {
  private readonly http = inject(HttpClient);

  signUp(signUpDetails: SignUpModel) {
    return this.http.post<void>(SIGN_UP_URL, signUpDetails);
  }
}

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SignUpService } from './sign-up.service';
import { SIGN_UP_URL } from '../api/endpoints.constants';
import { SignUpModel } from '../sign-up/sign-up.model';

describe('SignUpService', () => {
  let service: SignUpService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SignUpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should POST the sign-up details to the sign-up endpoint', () => {
    const details: SignUpModel = {
      firstName: 'First',
      lastName: 'Last',
      emailAddress: 'name@example.com',
    };

    service.signUp(details).subscribe();

    const req = httpTesting.expectOne(SIGN_UP_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(details);
    req.flush(null);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUp } from './sign-up';
import { By } from '@angular/platform-browser';

describe('SignUp', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUp],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    { name: 'firstName', errorMsg: 'Enter your first name' },
    { name: 'lastName', errorMsg: 'Enter your last name' },
    { name: 'emailAddress', errorMsg: 'Enter your email address' },
  ])(
    'should show "$errorMsg" message after the $name field is left empty',
    async ({ name, errorMsg }) => {
      const input = fixture.nativeElement.querySelector(`#${name}`);

      input.dispatchEvent(new Event('blur'));
      await fixture.whenStable();

      const errorEl = fixture.nativeElement.querySelector(`#${name}-error`);
      expect(errorEl?.textContent).toContain(errorMsg);
    },
  );

  it('should show the email format error message when the email address is invalid', async () => {
    const input = fixture.nativeElement.querySelector('#emailAddress') as HTMLInputElement;

    input.value = 'not-an-email';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();

    const errorEl = fixture.nativeElement.querySelector('#emailAddress-error');
    expect(errorEl?.textContent).toContain(
      'Enter your email address in the correct format, like name@example.com',
    );
  });
});

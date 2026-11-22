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

  it('should focus the first invalid field when an empty form is submitted', async () => {
    const button = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    button.click();
    await fixture.whenStable();

    const firstNameInput = fixture.nativeElement.querySelector('#firstName');
    const successEl = fixture.debugElement.query(By.css('[data-testid="success-heading"]'));

    expect(document.activeElement).toBe(firstNameInput);
    expect(firstNameInput.getAttribute('aria-invalid')).toBe('true');
    expect(successEl).toBeFalsy();
  });

  it('should show the success message when a valid form is submitted', async () => {
    const fields = [
      {
        field: fixture.nativeElement.querySelector('#firstName') as HTMLInputElement,
        value: 'First',
      },
      {
        field: fixture.nativeElement.querySelector('#lastName') as HTMLInputElement,
        value: 'Last',
      },
      {
        field: fixture.nativeElement.querySelector('#emailAddress') as HTMLInputElement,
        value: 'name@example.com',
      },
    ];
    fields.forEach((fieldObj) => {
      fieldObj.field.value = fieldObj.value;
      fieldObj.field.dispatchEvent(new Event('input'));
    });
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    button.click();
    await fixture.whenStable();

    const successEl = fixture.debugElement.query(By.css('[data-testid="success-heading"]'));
    expect(successEl).toBeTruthy();
  });
});
